# netplus-vsextension-heroku

* Publicar Extensão

    - npm install -g tfx-cli
    - npx tfx-cli extension create

    - https://learn.microsoft.com/en-us/azure/devops/extend/get-started/node?view=azure-devops

* Extensão

    - https://marketplace.visualstudio.com/items?itemName=RenerLemes.netplus-vsextension-heroku

* Modelo

    - https://github.com/swellaby/vsts-mirror-git-repository
    - https://github.com/swellaby/vsts-mirror-git-repository/blob/master/.github/CONTRIBUTING.md

* Padrão Inputs

    - $(Build.Repository.Uri)       https://{Organization}@dev.azure.com/{Organization}/{Projeto}/_git/{Repositorio}
    - Azure - GIT                   https://${System.AccessToken}@dev.azure.com/{Organization}/{Projeto}/_git/{Repositorio}
    - Heroku - GIT                  https://heroku:${Heroku.ApiKey}@git.heroku.com/${HerokuAppName}.git

* Azure TS Lib Documentation

    - https://github.com/microsoft/azure-pipelines-task-lib/blob/master/node/docs/azure-pipelines-task-lib.md