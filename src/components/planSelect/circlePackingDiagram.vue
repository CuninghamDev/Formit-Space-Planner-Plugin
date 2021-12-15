<template>
  <div class="pa-6 elevation-4">
    <svg
      id="d3-bubble-diagram-canvas"
      class="bubbleDiagram w-100 col ma-0 pa-0"
      style="height: 500px"
    ></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import { mapGetters } from "vuex";
export default {
  name: "CirclePackingDiagram",
  mounted() {
    this.drawUpdateDepartmentBubbles(
      this.structureData(this.activeProgramUnsorted)
    );
    window.addEventListener("resize", this.resize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resize);
  },
  watch: {
    activeProgramUnsorted: {
      handler: function () {
        // console.log("noticed a program change");
        this.drawUpdateDepartmentBubbles(this.structuredData);
      },
      deep: true,
    },
  },
  computed: {
    structuredData: function () {
      let struct = this.structureData(this.activeProgramUnsorted);
      return struct;
    },
    activeBuildingName: function () {
      return this.activeBuilding.name;
    },
    ...mapGetters(["activeProgramUnsorted", "activeBuilding", "getColorScale"]),
  },
  methods: {
    resize() {
      this.drawUpdateDepartmentBubbles(this.structuredData);
      // console.log("packed program resized");
    },
    drawUpdateDepartmentBubbles: function (data) {
      let color = this.getColorScale;
      // let labelHeight = 0;
      // let offsetVal = 25
      let svgCanvas = d3.select("#d3-bubble-diagram-canvas");
      let width = Number(svgCanvas.style("width").replace("px", ""));
      let height = Number(svgCanvas.style("height").replace("px", ""));

      svgCanvas.style("font", "10px sans-serif").attr("text-anchor", "middle");

      let pack = (data) =>
        d3.pack().size([width, height]).padding(3)(
          d3
            .hierarchy(data)
            .sum((d) => d.value)
            .sort((a, b) => b.value - a.value)
        );
      let root = pack(data);
      let groupings = svgCanvas.join("g");
      let node = groupings
        .selectAll("circle")
        .data(root.descendants().slice(1))
        .join((enter) =>
          enter
            .append("circle")
            .attr("r", 3)
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("start-x", (d) => d.x)
            .attr("start-y", (d) => d.y)
            .style("opacity", 0)
        )

        .attr("fill", function (d) {
          if (d.height != 0) {
            return "white";
          } else {
            return color(d.data.dept);
          }
        })
        .attr("stroke", function (d) {
          if (d.height != 0) {
            return "#000";
          } else {
            return null;
          }
        })
        .attr("stroke-dasharray", function (d) {
          if (d.height == 2) {
            return "3,4,3,4";
          } else {
            return "none";
          }
        })
        .classed("circle-selected", false)
        .on("click", function () {
          let selected = d3.select(this).classed("circle-selected");
          if (!selected) {
            d3.select(this)
              .classed("circle-selected", true)
              .append("title")
              .text(function (d) {
                return d.data.name;
              });
          } else {
            d3.select(this)
              .classed("circle-selected", false)
              .selectAll("title")
              .remove();
          }
          console.log("clicked", "selected", selected);
          d3.select(this)
            .transition()
            .duration(200)
            .attr("stroke-width", selected ? 1 : 3)
            .attr("stroke", (d) => {
              if (selected && d.height != 0) {
                return "#000";
              } else if (selected) {
                return null;
              } else {
                return "#000";
              }
            })
            .attr("stroke-dasharray", (d) => {
              if (selected && d.height == 2) {
                return "2,4,2,4";
              } else if (selected) {
                return "none";
              } else {
                return "none";
              }
            });
        });
      node
        .transition()
        .duration(200)
        .ease(d3.easeLinear)
        .attr("r", (d) => d.r)
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y)
        .style("opacity", 1);
    },
    structureData: function (data) {
      let structData = {
        name: this.activeBuildingName,
        children: [],
        keys: {},
        indexer: 0,
      };
      for (let p of data) {
        let quantity = p.quantity;
        let level = 0;
        let firstKey = "";
        let secondKey = "";
        if (p.group != "") {
          level = 3;
          firstKey = p.group + " | group";
          secondKey = p.department + " | department";
        } else if (p.department != "") {
          level = 2;
          firstKey = p.department + " | department";
        } else {
          level = 1;
        }
        // console.log(firstKey, secondKey);
        if (level == 1) {
          let i = 0;
          while (i < quantity) {
            i++;
            structData.children.push({
              name: p.name,
              value: p.area,
              dept: p.department,
            });
            structData.indexer++;
          }
        } else if (level == 2) {
          if (!(firstKey in structData.keys)) {
            structData.keys[firstKey] = structData.indexer;
            structData.indexer++;
            structData.children.push({
              name: p.department,
              indexer: 0,
              children: [],
            });
          }
          let firstSearch = structData.keys[firstKey];
          let i = 0;
          while (i < quantity) {
            i++;
            structData.children[firstSearch].children.push({
              name: p.name,
              value: p.area,
              dept: p.department,
            });
            structData.children[firstSearch].indexer++;
          }
        } else if (level == 3) {
          if (!(firstKey in structData.keys)) {
            structData.keys[firstKey] = structData.indexer;
            structData.indexer++;
            structData.children.push({
              name: p.group,
              indexer: 0,
              children: [],
              keys: {},
            });
          }
          let firstSearch = structData.keys[firstKey];
          if (p.department == "") {
            let i = 0;
            while (i < quantity) {
              i++;
              structData.children[firstSearch].children.push({
                name: p.name,
                value: p.area,
                dept: p.department,
              });
              structData.children[firstSearch].indexer++;
            }
          } else {
            if (!(secondKey in structData.children[firstSearch].keys)) {
              structData.children[firstSearch].keys[secondKey] =
                structData.children[firstSearch].indexer;
              structData.children[firstSearch].indexer++;
              structData.children[firstSearch].children.push({
                name: p.department,
                indexer: 0,
                children: [],
              });
            }
            let secondSearch = structData.children[firstSearch].keys[secondKey];
            let simplifiedSearch =
              structData.children[firstSearch].children[secondSearch];
            let i = 0;
            while (i < quantity) {
              i++;
              simplifiedSearch.children.push({
                name: p.name,
                value: p.area,
                dept: p.department,
              });
              simplifiedSearch.indexer++;
            }
          }
        }
      }
      // console.log("new way to structure data", structData);
      return structData;
    },
  },
};
</script>

<style></style>
