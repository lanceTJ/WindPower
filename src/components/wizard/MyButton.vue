<template>
  <a class="activate" @click="hand" :class="computedClasses">
    <span>
      <svg>
        <use xlink:href="#circle"></use>
      </svg>
      <svg>
        <use xlink:href="#arrow"></use>
      </svg>
      <svg>
        <use xlink:href="#check"></use>
      </svg>
    </span>
    <ul>
      <li>激 活</li>
      <li>等待...</li>
      <li>完 成</li>
    </ul>
  </a>
  <svg style="display: none">
    <symbol viewBox="0 0 16 16" id="circle">
      <circle cx="8" cy="8" r="7.5"></circle>
    </symbol>
    <symbol viewBox="0 0 12 12" id="arrow">
      <path
        d="M2.7008908,5.37931459 L2.7008908,5.37931459 C2.9224607,5.60207651 3.2826628,5.60304283 3.50542472,5.38147293 C3.52232305,5.36466502 3.53814843,5.34681177 3.55280728,5.32801875 L5.34805194,3.02646954 L5.34805194,10.3480519 C5.34805194,10.7081129 5.63993903,11 6,11 L6,11 C6.36006097,11 6.65194806,10.7081129 6.65194806,10.3480519 L6.65194806,3.02646954 L8.44719272,5.32801875 C8.6404327,5.57575732 8.99791646,5.61993715 9.24565503,5.42669716 C9.26444805,5.41203831 9.28230129,5.39621293 9.2991092,5.37931459 L9.2991092,5.37931459 C9.55605877,5.12098268 9.57132199,4.70855346 9.33416991,4.43193577 L6.75918715,1.42843795 C6.39972025,1.00915046 5.76841509,0.960656296 5.34912761,1.32012319 C5.31030645,1.35340566 5.27409532,1.38961679 5.24081285,1.42843795 L2.66583009,4.43193577 C2.42867801,4.70855346 2.44394123,5.12098268 2.7008908,5.37931459 Z"
      ></path>
    </symbol>
    <symbol viewBox="0 0 12 12" id="check">
      <path
        id="test"
        d="M4.76499011,6.7673683 L8.2641848,3.26100386 C8.61147835,2.91299871 9.15190114,2.91299871 9.49919469,3.26100386 C9.51164115,3.27347582 9.52370806,3.28637357 9.53537662,3.29967699 C9.83511755,3.64141434 9.81891834,4.17816549 9.49919469,4.49854425 L5.18121271,8.82537365 C4.94885368,9.05820878 4.58112654,9.05820878 4.34876751,8.82537365 L2.50080531,6.97362503 C2.48835885,6.96115307 2.47629194,6.94825532 2.46462338,6.93495189 C2.16488245,6.59321455 2.18108166,6.0564634 2.50080531,5.73608464 C2.84809886,5.3880795 3.38852165,5.3880795 3.7358152,5.73608464 L4.76499011,6.7673683 Z"
      ></path>
    </symbol>
  </svg>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
const isLoading = ref(false);
const isOK = ref(false);
const hand = () => {
  isLoading.value = true;
  setTimeout(() => {
    isOK.value = true;
    setTimeout(() => {
      isOK.value = false;
      isLoading.value = false;
    }, 1600);
  }, 3200);
};

const computedClasses = computed(() => {
  return {
    loading: isLoading.value,
    done: isOK.value,
  };
});
</script>

<style scoped>
.activate {
  display: table;
  background: #5628ee;
  box-shadow: 0 4px 20px rgba(86, 40, 238, 0.15);
  line-height: 20px;
  padding: 12px;
  border-radius: 22px;
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease, background 0.3s ease, box-shadow 0.3s ease;
}
.activate span {
  display: inline-block;
  vertical-align: top;
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
  margin: 0 4px 0 0;
  position: relative;
  overflow: hidden;
}
.activate span:before {
  content: "";
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  background: #5628ee;
  border-radius: 50%;
  transform: scale(0);
  transition: transform 0.3s ease, background 0.3s ease;
}
.activate span svg {
  position: absolute;
  width: 12px;
  height: 12px;
  left: 50%;
  top: 50%;
  margin: -6px 0 0 -6px;
  z-index: 1;
}
.activate span svg:nth-child(1) {
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  fill: none;
  margin: 0;
  stroke: #fff;
  stroke-width: 1px;
  stroke-dashoffset: 94.248;
  stroke-dasharray: 47.124;
}
.activate span svg:nth-child(2) {
  fill: #5628ee;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.activate span svg:nth-child(3) {
  fill: #5628ee;
  transform: translateY(20px);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275),
    opacity 0.3s ease;
}
.activate:hover {
  box-shadow: 0 8px 24px rgba(86, 40, 238, 0.15);
}
.activate:hover span svg:nth-child(2) {
  transform: translateY(-20px);
}
.activate:hover span svg:nth-child(3) {
  transform: translateY(0);
}
.activate:active {
  transform: scale(0.94);
  box-shadow: 0 4px 16px rgba(63, 220, 117, 0.18);
}
.activate.loading span {
  background: none;
  transition: background 0.1s ease 0.3s;
}
.activate.loading span:before {
  transform: scale(1);
}
.activate.loading span svg:nth-child(1) {
  -webkit-animation: turn 1.6s linear infinite forwards,
    path 1.6s linear infinite forwards;
  animation: turn 1.6s linear infinite forwards,
    path 1.6s linear infinite forwards;
}
.activate.loading span svg:nth-child(2) {
  transform: translateY(-20px);
}
.activate.loading span svg:nth-child(3) {
  opacity: 0;
  transform: translateY(0) scale(0.6);
}
.activate.loading ul {
  transform: rotateX(90deg);
}
.activate.loading.done {
  background: #3fdc75;
  box-shadow: 0 4px 20px rgba(63, 220, 117, 0.15);
}
.activate.loading.done span {
  background: #fff;
  transition: background 0.1s ease 0s;
}
.activate.loading.done span:before {
  background: #3fdc75;
  transform: scale(0);
}
.activate.loading.done span svg:nth-child(1) {
  -webkit-animation: none;
  animation: none;
}
.activate.loading.done span svg:nth-child(3) {
  fill: #3fdc75;
  opacity: 1;
  transform: scale(1);
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.3s,
    opacity 0.4s ease 0.25s;
}
.activate.loading.done ul {
  transform: rotateX(180deg);
}
.activate ul {
  padding: 0;
  margin: 0;
  list-style: none;
  height: 20px;
  width: 60px; /* 按钮宽度 */
  display: inline-block;
  vertical-align: top;
  text-align: center;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}
.activate ul li {
  --rotateX: 0deg;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  transform-origin: 50% 50%;
  transform: rotateX(var(--rotateX)) translateZ(10px);
}
.activate ul li:nth-child(2) {
  --rotateX: -90deg;
}
.activate ul li:nth-child(3) {
  --rotateX: -180deg;
}

@-webkit-keyframes turn {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes turn {
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes path {
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes path {
  100% {
    stroke-dashoffset: 0;
  }
}
html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: inherit;
}
*:before,
*:after {
  box-sizing: inherit;
}

body {
  min-height: 100vh;
  font-family: "Mukta Malar", Arial;
  color: #adafb6;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
