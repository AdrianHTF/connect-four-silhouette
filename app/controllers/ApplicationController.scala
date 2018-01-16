package controllers

import javax.inject.Inject

import com.mohiva.play.silhouette.api.{ LogoutEvent, Silhouette }
import com.mohiva.play.silhouette.impl.providers.SocialProviderRegistry
import play.api.i18n.{ I18nSupport, MessagesApi }
import play.api.mvc.{ Controller, Results }
import utils.auth.DefaultEnv
import de.htwg.sudoku.Sudoku
import de.htwg.sudoku.controller.SudokuController
//import de.htwg.sudoku.aview.tui.TextUI;
//import de.htwg.sudoku.controller.ISudokuController;

import scala.concurrent.Future

/**
 * The basic application controller.
 *
 * @param messagesApi The Play messages API.
 * @param silhouette The Silhouette stack.
 * @param socialProviderRegistry The social provider registry.
 * @param webJarAssets The webjar assets implementation.
 */
class ApplicationController @Inject() (
  val messagesApi: MessagesApi,
  silhouette: Silhouette[DefaultEnv],
  socialProviderRegistry: SocialProviderRegistry,
  implicit val webJarAssets: WebJarAssets)
  extends Controller with I18nSupport
  with Results {

  val controller: SudokuController = Sudoku.controller;
  //TextUI tui = Sudoku.getInstance().getTui();

  /**
   * Handles the index action.
   *
   * @return The result to display.
   */
  def index = silhouette.SecuredAction { implicit request =>
    Ok(views.html.home(request.identity))
  }

  def sudoku = silhouette.UnsecuredAction { implicit request =>
    Ok(views.html.sudoku(controller))
  }

  /**
   * Handles the Sign Out action.
   *
   * @return The result to display.
   */
  /*
  def signOut = silhouette.SecuredAction.async { implicit request =>
    val result = Redirect(routes.ApplicationController.index())
    silhouette.env.eventBus.publish(LogoutEvent(request.identity, request))
    silhouette.env.authenticatorService.discard(request.authenticator, result)
  }
  */
}
