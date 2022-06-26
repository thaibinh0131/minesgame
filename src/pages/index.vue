<script setup lang="ts"></script>

<template>
  <div class="w-full h-screen flex flex-col items-center mt-8">
    <div class="mb-8 w-full max-w-640px">
      <div class="text-left w-full flex flex-col justify-start items-start">
        <div class="text-2xl">Rules</div>
        <div class="mt-4">
          <ul class="">
            <li>- Click to open cell</li>
            <li>- Right click to place flag</li>
          </ul>
          <div class="mt-4 text-base font-bold">
            You will win if reach one of the following conditions
          </div>
          <ul class="">
            <li>- Total flags used = 0 and found all mines</li>
            <li>- Opened all cells do not have mines</li>
          </ul>
        </div>
      </div>
    </div>
    <Board />
  </div>
</template>
