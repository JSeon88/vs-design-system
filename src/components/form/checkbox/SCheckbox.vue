<template>
  <div><input v-model="value" type="checkbox" />{{ label }}</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    /** v-model */
    modelValue: boolean;
    /** label */
    label: string;
  }>(),
  {}
);

const emit = defineEmits<{
  /** v-model 업데이트 */
  (event: 'update:modelValue', param: boolean): void;
}>();

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});
</script>

<style lang="scss" scoped></style>
