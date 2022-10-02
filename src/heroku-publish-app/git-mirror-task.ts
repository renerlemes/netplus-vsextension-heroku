import * as taskLib from "azure-pipelines-task-lib";
import * as validUrl from "valid-url";
import { readFile, writeFileSync } from "fs";
import { resolve as resolvePath, join as joinPath } from "path";

export class GitMirrorTask {
    private herokuApplicationName: string | undefined;
    private herokuApiKey: string | undefined;

    public constructor() {
        try {
            if (this.taskIsRunning()) {
                this.herokuApplicationName = taskLib.getInput("herokuApplicationName", true);
                this.herokuApiKey = taskLib.getInput("herokuApiKey", true);
            }
        } catch (e) {
            taskLib.setResult(taskLib.TaskResult.Failed, e);
        }
    }

    public async run() {
        if (this.taskIsRunning()) {
            try {
                taskLib.which("git", true);

                await this.gitVersion();

                // const cloneMirrorResponseCode = await this.gitCloneMirror();
                // if (cloneMirrorResponseCode !== 0) {
                //     taskLib.setResult(taskLib.TaskResult.Failed, "An error occurred when attempting to clone the source repository. Please check output for more details.");
                //     return;
                // }

                // await this.removePullRequestRefs();

                // const pushMirrorResponseCode = await this.gitPushMirror();
                // if (pushMirrorResponseCode !== 0) {
                //     taskLib.setResult(taskLib.TaskResult.Failed, "An error occurred when attempting to push to the destination repository. Please check output for more details.");
                // }

            } catch (e) {
                taskLib.setResult(taskLib.TaskResult.Failed, e);
            }
        }
    }

    public gitVersion() {
        return taskLib.tool("git").arg("version").exec();
    }

    public gitCloneMirror() {
        // const authenticatedSourceGitUrl = this.getAuthenticatedGitUri(this.sourceGitRepositoryUri, this.sourceGitRepositoryPersonalAccessToken);
        // const verifySSLCertificateFlag = this.getSourceVerifySSLCertificate();
        // return taskLib
        //     .tool("git")
        //     .argIf(verifySSLCertificateFlag, ["-c", "http.sslVerify=true"])
        //     .argIf(!verifySSLCertificateFlag, ["-c", "http.sslVerify=false"])
        //     .arg("clone")
        //     .arg("--mirror")
        //     .arg(authenticatedSourceGitUrl)
        //     .arg(this.sourceGitRepositoryCloneDirectory)
        //     .exec();
    }

    public async removePullRequestRefs(): Promise<void> {
        // return new Promise<void>((resolve, reject) => {
        //     try {
        //         const packedRefsFileName = resolvePath(joinPath(".", `${this.sourceGitRepositoryCloneDirectory}/packed-refs`));

        //         readFile(packedRefsFileName, "utf8", (err, data) => {
        //             if (err) {
        //                 reject(err);
        //             }

        //             const nonPullRefLines = data.split("\n").filter((line) => !line.includes("refs/pull"));
        //             writeFileSync(packedRefsFileName, nonPullRefLines.join("\n"));
        //             resolve();
        //         });
        //     } catch (err) {
        //         reject(err);
        //     }
        // });
    }

    public gitPushMirror() {
        // const authenticatedDestinationGitUrl = this.getAuthenticatedGitUri(this.destinationGitRepositoryUri, this.destinationGitRepositoryPersonalAccessToken);
        // const verifySSLCertificateFlag = this.getDestinationVerifySSLCertificate();

        // return taskLib
        //     .tool("git")
        //     .argIf(verifySSLCertificateFlag, ["-c", "http.sslVerify=true"])
        //     .argIf(!verifySSLCertificateFlag, ["-c", "http.sslVerify=false"])
        //     .arg("-C")
        //     .arg(this.sourceGitRepositoryCloneDirectory)
        //     .arg("push")
        //     .arg("--mirror")
        //     .arg(authenticatedDestinationGitUrl)
        //     .exec();
    }

    public getSourceVerifySSLCertificate(): boolean {
        //return this.sourceVerifySSLCertificate;
        return true;
    }

    public getDestinationVerifySSLCertificate(): boolean {
        //return this.destinationVerifySSLCertificate;
        return true;
    }

    public getDefaultGitCloneDirectory(uri: string): string {
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

    public getAuthenticatedGitUri(uri: string, token: string): string {
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

    private taskIsRunning(): number {
        return taskLib.getVariables().length;
    }
}

const gitMirrorTask = new GitMirrorTask();
gitMirrorTask.run();