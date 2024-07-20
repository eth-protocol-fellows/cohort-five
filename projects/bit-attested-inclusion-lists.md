## An Inclusion List Protocol Based on the One-Bit-Per-Attester Idea

This solution tackles censorship issues caused by block builders in PBS and future ePBS. By employing **Reed-Solomon** erasure codes, it introduces a design that offers **plausible deniability** for Inclusion List Committee members, safeguarding them from accountability and legal constraints.

## Motivation

At the start of the cohort, I explored various privacy-related ideas to implement them as my project, including my own EIP (EIP-7503). However, after several iterations, I realized that having a censorship-resistant protocol is a prerequisite for most privacy approaches. Without this, block builders could censor all transactions related to these privacy measures, claiming non-compliance.

This realization led me to pivot towards working on censorship resistance at the protocol level. During my research, I discovered that block builders might also censor transactions for a few blocks to extract more money from these transactions through MEV-related actions. This further convinced me to focus on this topic.


<img src="https://raw.githubusercontent.com/irnb/board/main/img/newplot.png" alt="Censorship Statistics" width="500"/>

<br>

Statistics from [censorship.pics](https://censorship.pics/) indicate the urgent need for an active protocol-level solution to combat censorship resistance (CR) in Ethereum. We need to address this before the majority of relayers and builders turn into censoring builders for various reasons.

While projects and ideas that increase solo staking can help CR passively, a better option actively targeting the censorship issue is the inclusion list. There is a vast design space for implementing inclusion lists, but among these designs, the anon-ILs and One-bit-per-attester inclusion lists caught my attention. These designs consider the potential restrictions for different validators and the fear of being part of the IL, which could hinder the adoption of inclusion lists. These ideas work to add a layer of anonymity or plausible deniability for validators participating in the inclusion list flow.

After a deeper dive into both approaches, I chose to implement the one-bit-per attester method instead of anon-ILs because the anon-ILs require a somewhat central element. However, the one-bit-per attester approach also presented challenges since it was just an idea, not a fully specified and ready-to-implement solution. I saw this as an opportunity to train myself in creating full specifications, writing tests in the consensus-spec repo, and experiencing the full process of creating cross-layer specifications for an idea in the Ethereum ecosystem.

As mentioned earlier, the inclusion list is a cross-layer change, affecting the execution layer, consensus layer, and also the Engine API.


## Project description

What is your proposed solution? 

## Specification

How will you implement your solutions? Give details and more technical information on the project.

## Roadmap

What is your proposed timeline? Outline parts of the project and insight on how much time it will take to execute them.

## Possible challenges

What are the limitations and issues you may need to overcome?

## Goal of the project

What does success look like? Describe the end goal of the project, scope, state and impact for the project to be considered finished and successful.

## Collaborators

### Fellows 

Are there any fellows working with you on this project? 

### Mentors

Which mentors are helping you with the project? 

## More
### Pull Requests

### Considerations

## Resources

Provide links to repositories, PRs and other resources which constitute the project.
