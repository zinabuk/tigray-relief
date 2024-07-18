<template>
  <div class="border p-4 mb-4">
    <p>Name: {{ node.name }}</p>
    <p>Department: {{ node.department }}</p>
    <img v-if="node.image" :src="BASE_AVATAR + node.image" alt="Node Image" class="w-24 h-24 rounded-full">
    <div class="flex gap-2">
      <BaseButton @click="$emit('open-modal', node)">Add Child</BaseButton>
      <BaseButton @click="$emit('edit-node', node.id)">Edit</BaseButton>
      <BaseButton @click="$emit('delete-node', node)">Delete</BaseButton>
    </div>
    <div class="ml-4">
      <template v-if="node.children && node.children.length > 0">
        <NodeItem
          v-for="(child, index) in node.children"
          :key="index"
          :node="child"
          @open-modal="$emit('open-modal', $event)"
          @edit-node="$emit('edit-node', $event)"
          @delete-node="$emit('delete-node', $event)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { BASE_AVATAR } from '@/config';

export default defineComponent({
  name: 'NodeItem',
  components: {
    BaseButton,
  },
  props: {
    node: {
      type: Object,
      required: true,
    },
  },
  setup() {
    return {
      BASE_AVATAR,
    };
  },
});
</script>
