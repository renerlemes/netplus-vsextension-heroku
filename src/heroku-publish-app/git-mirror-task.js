"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitMirrorTask = void 0;
const taskLib = require("azure-pipelines-task-lib");
const validUrl = require("valid-url");
class GitMirrorTask {
    constructor() {
        try {
            if (this.taskIsRunning()) {
                this.herokuApplicationName = taskLib.getInput("herokuApplicationName", true);
                this.herokuApiKey = taskLib.getInput("herokuApiKey", true);
            }
        }
        catch (e) {
            taskLib.setResult(taskLib.TaskResult.Failed, e);
        }
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.taskIsRunning()) {
                try {
                    taskLib.which("git", true);
                    yield this.gitVersion();
                }
                catch (e) {
                    taskLib.setResult(taskLib.TaskResult.Failed, e);
                }
            }
        });
    }
    gitVersion() {
        return taskLib.tool("git").arg("version").exec();
    }
    gitCloneMirror() {
    }
    removePullRequestRefs() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    gitPushMirror() {
    }
    getSourceVerifySSLCertificate() {
        return true;
    }
    getDestinationVerifySSLCertificate() {
        return true;
    }
    getDefaultGitCloneDirectory(uri) {
        if (!validUrl.isUri(uri)) {
            throw new Error(`Provided URI '${uri}' is not a valid URI`);
        }
        const gitIdentifier = ".git";
        const repoNameStartIndex = uri.lastIndexOf("/") + 1;
        if (uri.endsWith(gitIdentifier)) {
            return uri.substring(repoNameStartIndex);
        }
        return `${uri.substring(repoNameStartIndex)}${gitIdentifier}`;
    }
    getAuthenticatedGitUri(uri, token) {
        if (!validUrl.isUri(uri)) {
            throw new Error("Provided URI '" + uri + "' is not a valid URI");
        }
        else if (token === undefined) {
            return uri;
        }
        else {
            const colonSlashSlash = "://";
            const protocol = uri.substring(0, uri.indexOf(colonSlashSlash));
            const address = uri.substring(uri.indexOf(colonSlashSlash) + colonSlashSlash.length);
            return protocol + colonSlashSlash + token + "@" + address;
        }
    }
    taskIsRunning() {
        return taskLib.getVariables().length;
    }
}
exports.GitMirrorTask = GitMirrorTask;
const gitMirrorTask = new GitMirrorTask();
gitMirrorTask.run();
//# sourceMappingURL=git-mirror-task.js.map