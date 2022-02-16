module.exports = (plop) => {
  const modulePath = (entity) => `../src/${entity}s/{{ name }}/{{ name }}.module.scss`;
  const componentPath = (entity) => `../src/${entity}s/{{ name }}/{{ name }}.tsx`;
  const storiesPath = (entity) => `../src/${entity}s/{{ name }}/{{ name }}.stories.tsx`;
  const indexPath = (entity) => `../src/${entity}s/{{ name }}/index.tsx`;

  plop.setGenerator('component', {
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name please',
      },
    ],
    actions: [
      {
        type: 'add',
        path: modulePath('component'),
        templateFile: 'templates/components/module.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: storiesPath('component'),
        templateFile: 'templates/components/stories.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: componentPath('component'),
        templateFile: 'templates/components/component.hbs',
        abortOnFail: true,
      },
      {
        type: 'add',
        path: indexPath('component'),
        templateFile: 'templates/components/index.hbs',
        abortOnFail: true,
      },
    ],
  });
};
