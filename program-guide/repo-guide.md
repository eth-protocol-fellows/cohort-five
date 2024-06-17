# Participate in the program

As a participant in the program, you should be using this repository. The goal of this repo is to be:

- An informational resource for how the EPF program operates.
- A coordination point for people participating in the program.
- A historical record of prior projects.
- A collection of useful resources for future program participants.

Please, be open with anything you wish to improve about these processes. Feel free to be bold and simply open a pull request with the changes and we can discuss them there.

## Development Updates

One of the core goals of this program is to improve your technical writing and communication skills. One key way to do this is to get comfortable telling people about what you are working on. One of the expectations for program participants is a regularly cadenced development update. For the duration of the program, all participants should publish a development update at least once every two weeks.

A good development update can take many forms. Every individual will probably need to find their own style. Here are some suggestions.

- You don't need to explain everything, but sometimes it is good to try and explain things to see if you know how.
- A bulleted list of factual statements about what you worked on is a great place to start.
- Links are great. Forum posts. Pull requests. HackMD documents. Any resources you have been studying or creating. 

A great example are Danny Ryan's "finalized" series of development updates. For example this one: https://blog.ethereum.org/2021/04/02/finalized-no-25/
You can also check out development updates from [previous cohorts](https://github.com/eth-protocol-fellows/cohort-four/blob/master/development-updates.md). 

You should: 

- Post your first update within the first week of starting into the program, write about your initial research. 
- Post your update somewhere public. Publishing using an external blog, hackmd or own website are all great. Link it in the main [`development-updates.md` document](/development-updates.md) in corresponding table. Open a PR from a branch dedicated to specific week in your fork of the repo. 
- *if* you post your update somewhere external, make sure to provide a URL referencing your development update in the [`development-updates.md` document](/development-updates.md).
- Make sure the markdown table is properly formatted before you push your commits. You can use a local IDE with markdown support, hackmd or [table formatting tool](https://github.com/nvuillam/markdown-table-formatter). 
- Share your development update to current thread in R&D Discord `#protocol-fellowship` channel
- Not use an LLM or similar tech for generating your updates. The point is to excercise your technical writing and expressing ideas, generated updates won't be accepted. 

### Using `/projects/<project-name>.md`

Project deliverables should be posted in various open places such as the Research forum, the Ethereum Magicians forums, github gists, hackmd documents and this repository. 

Create a document under the path `/projects/<project-name>.md`. Take inspiration for writing your project from the [project template](/projects/project-template.md). Generally, your project document should include: 

- Basic description of project you are working on, scope, goals and roadmap
- All necessary links to repos where development is happening, documentation, research posts and technical background 
- List of participants working on the project

This document can be created later in the program when your project is mature enough and you are ready to present it. It's generally recommend around month into the fellowship, weeks 4-6. 

### Using `/notes/<your-name>.md`

Feel free to create a document under the path `/notes/<your-name>.md`. This document should be used for things like:

- Aggregating links to reading resources you've found useful.
- Writing down notes about potential projects.
- Fleshing out full details of potential projects.
- Development updates.

This document isn't meant to be a "profile". It is meant to be used especially in the [first phases](/program-guide/program-details.md#phase-one) of the program where most of the exploration takes place. 

### Merging Pull Requests

Merge access will be granted relatively widely. Cohort organizers will merge your first PRs but then feel free to reach out to get the access. 

When submitting a PR, make sure you are using the latest master branch. Otherwise rebase and keep your changes always on top to be sure you are not deleting content of others.

When merging someone else's PR, use your best judgement and ask if you are unsure. 

If your IDE or system creates some hidden config files (e.g. `.vscode/...), please make sure you don't upload them to the repo by updating the gitignore. 

