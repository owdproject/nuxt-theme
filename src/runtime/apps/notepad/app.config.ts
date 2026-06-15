export default {
  id: 'org.owdproject.notepad',
  title: 'Notepad',
  singleton: false,
  icon: 'i-heroicons-document-text',
  provides: {
    name: 'notepad',
    entry: 'notepad',
  },
  windows: {
    main: {
      component: () => import('./components/Window/WindowNotepad.vue'),
      resizable: true,
      size: {
        width: 600,
        height: 400,
      },
      position: {
        x: 180,
        y: 120,
        z: 0,
      },
    },
  },
  entries: {
    notepad: {
      command: 'notepad',
    },
  },
  commands: {
    notepad: (app: any) => {
      app.openWindow('main')
    },
  },
}
