<template>
  <div class="item mt-0 flex relative pl-20 py-2 pb-4">
    <i class="flex items-center justify-center border border-gray-200 bg-white rounded-lg text-current absolute top-1/2 -translate-y-1/2 -left-6 w-12 h-12">
      <slot name="icon"></slot>
    </i>
    <div class="details flex-1 ml-0">
      <h3 class="text-xl font-medium mb-1.5 text-gray-900">
        <slot name="heading"></slot>
      </h3>
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.item:before {
  content: ' ';
  border-left: 1px solid var(--color-border);
  position: absolute;
  left: 0;
  bottom: calc(50% + 25px);
  height: calc(50% - 25px);
}

.item:after {
  content: ' ';
  border-left: 1px solid var(--color-border);
  position: absolute;
  left: 0;
  top: calc(50% + 25px);
  height: calc(50% - 25px);
}

.item:first-of-type:before {
  display: none;
}

.item:last-of-type:after {
  display: none;
}
</style>
