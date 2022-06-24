 <template>
  <a-layout-footer class="layout-footer">
    <a-menu mode="horizontal" id="main-nav" :defaultSelectedKeys="[$route.name]" >
      <a-menu-item v-for="nav in mainNav" :key="nav.name" class="nav__item px-0 pt-3" >
        <router-link :to="nav.path">
          <img v-if="$route.name === nav.pathName" :src="`/img/menu-icons/${nav.img}-selected.png`" style="max-height: 24px" />
          <img v-else-if="nav.img" :src="`/img/menu-icons/${nav.img}.png`" style="max-height: 24px" />
          <i v-else :class="['fas', nav.icon]"/>
          <p class="pt-1">{{ nav.name }}</p>
        </router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-footer>
</template>
<script>
export default {
  name: 'MainMenuBottom',
  data() {
    return {
      mainNav: [
        { path: '/', name: 'Home', pathName: 'Home', img: 'home', icon: 'fa-home' },
        { path: '/remedies', name: 'Remedies', pathName: 'Remedies', img: 'remedies', icon: 'fa-leaf' },
        { path: '/naturopaths', name: 'Naturopaths', pathName: 'Naturopaths', img: 'naturopaths', icon: 'fa-user-friends' },
        { path: '/articles', name: 'Blog', pathName: 'Articles', img: 'articles', icon: 'fa-article' },
        { path: '/shop', name: 'Shop', pathName: 'Shop', img: 'shops', icon: 'fa-store' }
      ]
    }
  }
}
</script>
