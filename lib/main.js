const core = require('@actions/core');
const github = require('@actions/github');

try {
    const [owner, repo] = core.getInput('target').split('/');
    const event_type = core.getInput('event_type');
    const client_payload = JSON.parse(core.getInput('client_payload'));
    const token = core.getInput('token');
    const client = github.getOctokit(token)
    return client.rest.repos.createDispatchEvent({
      owner,
      repo,
      event_type,
      client_payload
    });
} catch (error) {
    console.log(JSON.stringify(error));
    core.setFailed(error.message);
}
