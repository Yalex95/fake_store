<template>
  <Disclosure
    as="nav"
    class="relative after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
    v-slot="{ open }"
  >
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between py-5">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-indigo-500"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Icon
              name="heroicons:bars-3"
              v-if="!open"
              class="block size-6"
              aria-hidden="true"
            />
            <Icon
              name="heroicons:x-mark"
              v-else
              class="block size-6"
              aria-hidden="true"
            />
          </DisclosureButton>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex shrink-0 items-center">
            <img class="h-20 w-auto" src="/images/logos/logo_shop.webp" />
          </div>
          <!-- <div class="hidden sm:ml-6 sm:block my-auto">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.current
                    ? 'text-blue-500'
                    : 'text-gray-700  hover:text-blue-500',
                  'rounded-md px-3 py-2 text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</a
              >
            </div>
          </div> -->
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <NuxtLink
            v-show="!auth.isLoggedIn"
            to="/login"
            class="inline-flex gap-3 relative rounded-lg py-1 px-3 text-gray-600 font-semibold border-2 border-gray-200 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500"
          >
            Login
            <Icon
              name="ri:login-circle-fill"
              class="size-6 text-blue-500"
              aria-hidden="true"
            />
          </NuxtLink>

          <!-- Profile dropdown -->
          <ClientOnly>
            <Menu
              v-show="auth.isLoggedIn && user"
              as="div"
              class="relative ml-3"
            >
              <MenuButton
                class="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <img
                  class="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                  :src="user?.avatar ?? '/images/avatar.jpg'"
                  :alt="user?.name ?? 'avatar'"
                />
              </MenuButton>

              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <MenuItems
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline -outline-offset-1 outline-white/10"
                >
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-white/5 outline-hidden' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >Your profile</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <a
                      href="#"
                      :class="[
                        active ? 'bg-white/5 outline-hidden' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                      >Settings</a
                    >
                  </MenuItem>
                  <MenuItem v-slot="{ active }">
                    <button
                      :onclick="logout"
                      :class="[
                        active ? 'bg-white/5 outline-hidden' : '',
                        'block px-4 py-2 text-sm text-gray-700',
                      ]"
                    >
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </transition>
            </Menu>
            <!-- <NuxtLink
              to="/cart"
              class="relative ml-5 rounded-full p-1 text-gray-400 hover:text-blue-500"
            >
              <span class="sr-only">View Cart</span>
              <Icon
                name="material-symbols:shopping-cart-rounded"
                class="size-6"
              />
              <span
                class="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                2
              </span>
            </NuxtLink> -->
          </ClientOnly>
        </div>
      </div>
    </div>

    <!-- <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-950/50 text-white'
              : 'text-gray-700 hover:bg-white/5 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
      </div>
    </DisclosurePanel> -->
  </Disclosure>
</template>

<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { useAuthStore } from "~/store/auth";
const auth = useAuthStore();
const user = auth.user;
const login = async () => {
  await auth.getCurrentUser();
};
const logout = async () => {
  await auth.logout();
};
const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];
</script>
