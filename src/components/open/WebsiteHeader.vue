<script setup>
// import { ref } from 'vue'
import { OPEN_MENUS } from '@/constants/open-navigation'
// let selected = ref({})
</script>
<template>
  <nav class="w-full px-[6%] z-40 bg-[#539000] text-white flex justify-between">
    <div class="flex gap-4 justify-end px-4 py-2 w-full">
      <router-link to="/"
        ><font-awesome-icon icon="fab fa-facebook"></font-awesome-icon
      ></router-link>
      <router-link to="/"
        ><font-awesome-icon icon="fab fa-linkedin"></font-awesome-icon
      ></router-link>
      <router-link to="/"
        ><font-awesome-icon icon="fab fa-twitter"></font-awesome-icon>
      </router-link>
    </div>
  </nav>
  <header
    class="w-full flex z-40 sticky shadow-md top-0 items-center justify-between font-bold px-4 bg-white/100"
  >
    <div>
      <img
        src="@/assets/rest-logo.png"
        alt=""
        width="200px"
        height="100px"
        class="py-2 w-42 h-20"
      />
    </div>
    <div>
      <nav class="w-full flex">
        <ul class="flex space-x-4 px-4 w-full">
          <li v-for="menu in OPEN_MENUS" :key="menu.name" class="menu-item relative">
            <router-link :to="{ name: menu.name }" exact-active-class="isActive">{{
              menu.label
            }}</router-link>
            <ul v-if="menu.SUB_MENUS" class="submenu">
              <li
                v-for="submenu in menu.SUB_MENUS"
                :key="submenu.name"
                class="submenu-item flex flex-col gap-4"
              >
                <router-link v-if="submenu.requiresRoute" :to="{ name: submenu.name }">{{
                  submenu.label
                }}</router-link>
                <a v-else>{{ submenu.label }}</a>
                <ul v-if="submenu.children" class="submenu">
                  <li v-for="child in submenu.children" :key="child.name" class="submenu-item">
                    <a>{{ child.label }}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
    <div class="px-4">
      <router-link to="/donate" class="bg-yellow-300 rounded-xl text-black capitalize px-4 py-2"
        >Donate Now</router-link
      >
    </div>
  </header>
</template>

<style scoped>
.menu-item:hover .submenu,
.submenu-item:hover .submenu {
  display: block;
  background-color: white;
  opacity: 1;
}

.submenu {
  display: none;
  position: absolute;
  padding: 12px;
  z-index: 50;
  min-height: 200px;
  min-width: 200px;
  /* margin-top: px; */
}

.menu-item:hover .submenu {
  left: 0;
  top: 100%;
}
.isActive {
  color: #539000;
}
</style>
