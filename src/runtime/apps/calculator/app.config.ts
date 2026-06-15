export default {
  id: 'org.owdproject.calculator',
  title: 'Calculator',
  singleton: false,
  icon: 'i-heroicons-calculator',
  provides: {
    name: 'calculator',
    entry: 'calculator',
  },
  windows: {
    main: {
      component: () => import('./components/Window/WindowCalculator.vue'),
      resizable: false,
      size: {
        width: 260,
        height: 380,
      },
      position: {
        x: 200,
        y: 150,
        z: 0,
      },
    },
  },
  entries: {
    calculator: {
      command: 'calculator',
    },
  },
  commands: {
    calculator: (app: any) => {
      app.openWindow('main')
    },
  },
}
