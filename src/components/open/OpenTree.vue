<template>
  <div ref="tree" class=""></div>
</template>

<script>
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
      i: 0
    }
  },
  mounted() {
    this.initializeTree()
    this.update(this.root)
  },
  methods: {
    initializeTree() {
      const data = this.data
      const width = 800
      const height = 600
      const margin = { top: 20, right: 120, bottom: 20, left: 120 }

      const svg = d3
        .select(this.$refs.tree)
        .append('svg')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)

      this.root = d3.hierarchy(data, (d) => d.children)
      this.root.x0 = height / 2
      this.root.y0 = 0

      this.treeLayout = d3.tree().size([height, width])

      this.svg = svg
    },
    update(source) {
      const duration = 750

      const treeData = this.treeLayout(this.root)
      const nodes = treeData.descendants()
      const links = treeData.descendants().slice(1)

      nodes.forEach((d) => (d.y = d.depth * 180))

      const node = this.svg.selectAll('g.node').data(nodes, (d) => d.id || (d.id = ++this.i))

      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr('transform', `translate(${source.y0},${source.x0})`)
        .on('click', this.click)

      //nodeEnter
        //.append('rect')
        //.attr('width', 100)
        //.attr('height', 30)
        //.attr('x', -50)
        //.attr('y', -15)
        //.attr('fill', '#fff')
        //.attr('stroke', 'steelblue')
        //.attr('stroke-width', 1.5)
      nodeEnter
        .append('circle')
	.attr('r', '40')
        .attr('stroke', 'steelblue')
        .attr('fill', 'white')

      nodeEnter
        .append('svg:image')
        .attr('x', -40) // Adjust position as needed
        .attr('y', -40) // Adjust position as needed
        .attr('width', 80) // Adjust size as needed
        .attr('height', 80)
        .attr("xlink:href", d => d.data.image)
	.attr("clip-path", "circle()")

      nodeEnter
        .append('text')
        .attr('y', 15)
        .attr('x', -80)
        .style('text-anchor', 'middle')
        .text((d) => d.data.name)
      nodeEnter
        .append('text')
        .attr('dy', 0)
        .attr('x', -100)
        .style('text-anchor', 'middle')
        .text((d) => d.data.department)
      const nodeUpdate = nodeEnter.merge(node)

      nodeUpdate
        .transition()
        .duration(duration)
        .attr('transform', (d) => `translate(${d.y},${d.x})`)

      nodeUpdate
        .append("svg")
        .attr("width", 500)
        .attr("height", 500)

      const nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr('transform', `translate(${source.y},${source.x})`)
        .remove()

      nodeExit.select('rect').attr('width', 100).attr('height', 30).attr('x', -50).attr('y', -15)

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

      nodes.forEach((d) => {
        d.x0 = d.x
        d.y0 = d.y
      })
    },
    diagonal(s, d) {
      return `M ${s.y} ${s.x}
                C ${(s.y + d.y) / 2} ${s.x},
                  ${(s.y + d.y) / 2} ${d.x},
                  ${d.y} ${d.x}`
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
