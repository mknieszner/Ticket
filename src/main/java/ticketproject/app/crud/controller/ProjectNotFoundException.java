package ticketproject.app.crud.controller;

public class ProjectNotFoundException extends RuntimeException {
  public ProjectNotFoundException(final String projectId) {
    super("could not find project '" + projectId + "'.");
  }
}
