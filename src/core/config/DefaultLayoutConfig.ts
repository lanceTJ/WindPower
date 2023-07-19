import LayoutConfigTypes from "@/core/config/LayoutConfigTypes";

const config: LayoutConfigTypes = {
  themeName: "Tengfeng",
  themeVersion: "1.0.0",
  demo: "demo1",
  main: {
    type: "default",
    primaryColor: "#009EF7",
    logo: {
      dark: "media/logos/default-dark.svg",
      light: "media/logos/default.svg",
    },
  },
  illustrations: {
    set: "unitedpalms-1",
    // set: "dozzy-1",
    // set: "sketchy-1",
  },
  loader: {
    logo: "media/logos/default-dark.svg",
    display: true,
    type: "spinner-message",
  },
  scrollTop: {
    display: true,
  },
  header: {
    display: true,
    menuIcon: "font",
    width: "fluid",
    fixed: {
      desktop: true,
      tabletAndMobile: true,
    },
  },
  toolbar: {
    display: true,
    width: "fluid",
    fixed: {
      desktop: true,
      tabletAndMobile: true,
    },
  },
  aside: {
    display: true,
    theme: "light",
    // theme: "dark",
    fixed: true,
    menuIcon: "svg",
    minimized: false,
    minimize: true,
    hoverable: true,
  },
  content: {
    width: "fixed",
  },
  // footer: {
  //   width: "fluid",
  // },
};

export default config;
