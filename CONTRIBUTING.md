
# Contributing to gRPC IoT Platform Demo

Thank you for considering contributing! This project is a demonstration and learning resource, and improvements are welcome.

## How Can I Contribute?

### Reporting Bugs

*   Search existing [Issues](https://github.com/kunalPisolkar24/grpc-iot-project/issues) to see if the bug has already been reported.
*   If not, [open a new issue](https://github.com/kunalPisolkar24/grpc-iot-project/issues/new). Include a clear title, description, relevant information, and ideally a reproducible test case.

### Suggesting Enhancements

*   Open a new issue to discuss your proposed enhancement. Describe the current behavior, the desired change, and the reasoning.

### Code Contributions

1.  **Fork** the repository on GitHub.
2.  **Clone** your fork locally: `git clone https://github.com/YourUsername/grpc-iot-project.git`
3.  Create a **new branch**: `git checkout -b feature/your-feature` or `fix/bug-description`.
4.  Make your **changes**, adhering to existing style.
5.  **Test** your changes thoroughly.
6.  **Commit** your changes with a clear message: `git commit -m "feat: Describe your feature"` or `fix: Describe your fix`.
7.  **Push** your branch to your fork: `git push origin your-branch-name`.
8.  Open a **Pull Request (PR)** to the `main` branch of `kunalPisolkar24/grpc-iot-project`.
    *   Provide a clear title and description for your PR.
    *   Reference any related issues.

## Development Setup Notes

*   Modifying `proto/iot_service.proto` requires regenerating client stubs. From the `client/` directory:
    ```bash
    npm run proto:gen:local
    ```
    The Docker build also handles this via `npm run proto:gen`.
*   Python server stubs are generated during its Docker image build.

## Pull Request Process

1.  Update `README.md` with details of any interface changes (env vars, ports, etc.).
2.  Your PR will be reviewed, and feedback may be provided.

## Code of Conduct

*   Be respectful and considerate.
*   Constructive criticism is welcome; personal attacks are not.
*   Help create a positive environment.

We look forward to your contributions!