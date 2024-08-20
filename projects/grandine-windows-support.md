# Grandine Windows Support

To support building Grandine on Windows.

## Motivation

Grandine's developers mainly use Linux, so Grandine is tested only on Linux. However, there are many Windows and MacOS users that would benefit from better support. Furthermore, another Ethereum consensus client [Lighthouse](https://github.com/sigp/lighthouse) already supports Windows. 

## Project description

The goal of this project is to extend support for building Grandine, an Ethereum consensus client, on Windows. While Grandine has been primarily developed and tested on Linux, expanding its compatibility to Windows will make it more accessible to a broader range of developers and users.

This project seeks to ensure that Windows users can build, run, and/or contribute to Grandine without platform-specific issues. With another Ethereum consensus client, Lighthouse, already supporting Windows, this project will make Grandine to catch up with other clients in terms of cross-OS support.

## Specification

No Ethereum specification for this project.

## Roadmap

Based on my personal experience, I would preliminarily estimate the time to be three weeks. But in fact, this task may be simple or complex, depending on the actual code that needs to be modified and the experience of the person completing it.

1. Initial Assessment (Week 1):

    + Analyze the current Grandine codebase and identify the areas that require modifications for Windows compatibility.

2. Development Phase (Week 1):

    + Modify the build system to support Windows. 

2. Testing and Validation (Week 2):

    + Ensure all or main (if not all are suitable) tests Grandine can be passed on Windows.
    + Fix or add some tests for Windows platform if necessary.

3. Finalization and Documentation (Week 3):

    + Set up a Windows-based CI pipeline to automate testing.
    + Add documentation for Windows related building and usage(if needed).
    + Announce and support the Windows-compatible release of Grandine.

## Possible challenges

- Dependencies and toolings Handling:

    Some dependencies and toolings may be tightly coupled with Linux, requiring alternative solutions or adjustments to work on Windows.

- Codes, Tests and CI Pipeline Fixing:

    Codes, tests and CI pipeline fixing for Windows might involve overcoming challenges related to the understanding with current code base and platform or code specific issues. This step may be complex or simple, depending on the actual code that needs to be modified and the experience of the person doing it.

## Goal of the project

By the end of EPF-5, success for this project will be defined by:

The goal of this project is to successfully build Grandine on Windows and enable a CI pipeline for testing and release building. 

## Collaborators

### Fellows 

[MJZK](https://github.com/mjzk)

### Mentors

[Saulius Grigaitis](https://github.com/sauliusgrigaitis) 

## Resources

- [Lighthouse, an Ethereum consensus client](https://github.com/sigp/lighthouse)