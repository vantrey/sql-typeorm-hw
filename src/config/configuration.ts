enum Environments {
  DEVELOPMENT = 'DEVELOPMENT',
  STAGING = 'STAGING',
  PRODUCTION = 'PRODUCTION',
  TEST = 'TEST',
}

export type EnvironmentVariable = { [key: string]: string | undefined };

export type ConfigurationType = ReturnType<typeof getConfig>;
export type ApiSettingsType = ReturnType<typeof getConfig>['apiSettings'];
export type DatabaseSettingsType = ReturnType<typeof getConfig>['databaseSettings'];
export type EnvironmentSettingsType = ReturnType<typeof getConfig>['environmentSettings'];

const getConfig = (environmentVariables: EnvironmentVariable, currentEnvironment: Environments) => {
  return {
    apiSettings: {
      PORT: Number.parseInt(environmentVariables.PORT || '5001'),
      BASE_URL: environmentVariables.BASE_URL
    },

    databaseSettings: {
      DATABASE: environmentVariables.DB_DATABASE || '',
      PASSWORD: environmentVariables.DB_PASSWORD,
      USERNAME: environmentVariables.DB_USERNAME,
      HOST: environmentVariables.DB_HOST
    },

    environmentSettings: {
      currentEnv: currentEnvironment,
      isProduction: currentEnvironment === Environments.PRODUCTION,
      isStaging: currentEnvironment === Environments.STAGING,
      isTesting: currentEnvironment === Environments.TEST,
      isDevelopment: currentEnvironment === Environments.DEVELOPMENT,
    },

    telegramSettings: {
      secret: environmentVariables.TELEGRAM_BOT_SECRET || '',
    },
  }
};

export default () => {
  const environmentVariables = process.env;

  console.log('process.env.NODE_ENV =', environmentVariables.NODE_ENV);
  const currentEnvironment: Environments = environmentVariables.NODE_ENV as Environments;

  return getConfig(environmentVariables, currentEnvironment);
};
