<template>
  <div class="border p-4 mb-4">
    <p>Name: {{ node.name }}</p>
    <p>Department: {{ node.department }}</p>
    <img v-if="node.image" :src="`/${node.image}`" alt="Node Image" class="max-w-xs max-h-xs">
    <BaseButton @click="$emit('open-modal', node)">Add Child</BaseButton>
    <div class="ml-4">
      <template v-if="node.children && node.children.length > 0">
        <NodeItem
          v-for="(child, index) in node.children"
          :key="index"
          :node="child"
          @open-modal="$emit('open-modal', $event)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/base/BaseButton.vue';

export default {
  components: {
    BaseButton,
  },
  name: 'NodeItem',
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
};
</script>
