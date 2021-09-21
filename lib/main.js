const core = require('@actions/core');
const github = require('@actions/github');

try {
    const [owner, repo] = core.getInput('target').split('/');
    const event_type = core.getInput('event_type');
    const payload = JSON.parse(core.getInput('client_payload'));
    const token = core.getInput('token');
    const client = github.getOctokit(token)
    return client.rest.repos.createDispatchEvent({
      owner,
      repo,
      event_type,
      // Per the github API, client_payload is only allowed to have 10 properties...
      // So to send whole event information we can stash the full payload as a property of client_payload. 
      client_payload: { payload } 
    });
} catch (error) {
    console.log(JSON.stringify(error));
    core.setFailed(error.message);
}
