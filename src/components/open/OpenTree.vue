<template>
  <div ref="tree" class="o  w-full overflow-x-auto h-auto"></div>
</template>

<script lang="js">
import { BASE_AVATAR } from '@/config'
import * as d3 from 'd3'

export default {
  name: 'OrgTree',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      root: null,
      treeLayout: null,
      i: 0,
      con: []
    }
  },
  mounted() {
    this.initializeTree()
    this.update(this.root)
  },
  methods: {
    initializeTree() {
      const data = this.data
      const width = 900 // Width of the SVG container
      const height = 1200 // Height of the SVG container
      const margin = { top: 60, right: 120, bottom: 20, left: 120 }

      const svg = d3
        .select(this.$refs.tree)
        .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`) // Align from the top-left corner

      this.root = d3.hierarchy(data, (d) => d.children)
      this.root.x0 = 0
      this.root.y0 = 0
      this.treeLayout = d3.tree().size([width, height])

      this.svg = svg
    },
    update(source) {
      const duration = 750
      const treeData = this.treeLayout(this.root)
      const nodes = treeData.descendants()
      const links = treeData.descendants().slice(1)
      nodes.forEach((d) => {
        d.x = d.x * 1.2 // Horizontal positioning
        d.y = d.depth * 200 // Vertical positioning based on depth (120px between each level)
      })

      const node = this.svg.selectAll('g.node').data(nodes, (d) => d.id || (d.id = ++this.i))

      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', `translate(${source.x0},${source.y0})`)
        .on('click', this.click)
      nodeEnter.append('circle').attr('r', '80').attr('stroke', 'steelblue').attr('fill', 'white')

      // Add image to each node
      nodeEnter
        .append('svg:image')
        .attr('x', -80) // Adjust position as needed
        .attr('y', -80) // Adjust position as needed
        .attr('width', 160) // Adjust size as needed
        .attr('height', 160)
        .attr('xlink:href', (d) => {
          if (d.data.image == BASE_AVATAR + 'null') {
            return '/image/org.jpg'
          } else {
            return d.data.image
          }
        })
        .attr('clip-path', 'circle()')

      // Add text (name and department)
      nodeEnter
      .append('text')
      .attr('y', 80) // Position below the image (adjust as needed)
      .attr('x', 0) // Center horizontally
      .style('text-anchor', 'middle')
      .text((d) => d.data.name)

    nodeEnter
      .append('text')
      .attr('dy', 100) // Position below the name (adjust as needed)
      .attr('x', 0) // Center horizontally
      .style('text-anchor', 'middle')
      .text((d) => this.test(d.data.department, 'first'))

    nodeEnter
      .append('text')
      .attr('dy', 110) // Position below the second line (adjust as needed)
      .attr('x', 0) // Center horizontally
      .style('text-anchor', 'middle')
      .text((d) => this.test(d.data.department, 'second'))

    nodeEnter
      .append('text')
      .attr('dy', 120) // Position below the third line (adjust as needed)
      .attr('x', 0) // Center horizontally
      .style('text-anchor', 'middle')
      .text((d) => this.test(d.data.department, 'final'))

      // Update node position for animation
      const nodeUpdate = nodeEnter.merge(node)

      nodeUpdate
        .transition()
        .duration(duration)
        .attr('transform', (d) => `translate(${d.x},${d.y})`) // x is now horizontal and y is vertical

      // Remove exiting nodes
      const nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr('transform', `translate(${source.x},${source.y})`)
        .remove()

      // Add/update links between nodes
      const link = this.svg.selectAll('path.link').data(links, (d) => d.id)

      const linkEnter = link
        .enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('d', () => {
          const o = { x: source.x0, y: source.y0 }
          return this.diagonal(o, o)
        })

      const linkUpdate = linkEnter.merge(link)

      linkUpdate
        .transition()
        .duration(duration)
        .attr('d', (d) => this.diagonal(d, d.parent))

      link
        .exit()
        .transition()
        .duration(duration)
        .attr('d', () => {
          const o = { x: source.x, y: source.y }
          return this.diagonal(o, o)
        })
        .remove()

      // Store old positions for transition
      nodes.forEach((d) => {
        d.x0 = d.x
        d.y0 = d.y
      })
    },
    diagonal(s, d) {
      return `M ${s.x} ${s.y}
              C ${(s.x + d.x) / 2} ${s.y},
                ${(s.x + d.x) / 2} ${d.y},
                ${d.x} ${d.y}`
    },
    click(event, d) {
      if (d.children) {
        d._children = d.children
        d.children = null
      } else {
        d.children = d._children
        d._children = null
      }
      this.update(d)
    },
    test(data, text) {
      if (data != null) {
        let datas = []
        let f = ""
        let k = ""
        let m = ""

        datas = data.split(" ")
        if (datas[0] && datas[1]) {
          f = datas[0] + ' ' + datas[1]
        }

        if (text == "first") {
          return f
        } else if (text == "second") {
          for (let l = 2; l < datas.length; l++) {
            if (l < 5) {
              k += datas[l] + " "
            }
          }
          return k
        } else {
          for (let d = 5; d < datas.length; d++) {
            m += datas[d] + " "
          }
          return m
        }
      }
    }
  }
}
</script>

<style>
.link {
  fill: none;
  stroke: #555;
  stroke-opacity: 0.4;
  stroke-width: 1.5px;
}

.node rect {
  fill: #fff;
  stroke: steelblue;
  stroke-width: 1.5px;
}

.node text {
  font: 12px sans-serif;
}
</style>
