import { $ } from "@wdio/globals";
import { blogPage } from "./blog.page.ts";
import Page from "./page.ts";

class CommentPage extends Page {
  get textareaCommentMessage() {
    return $('[data-testid="comment-message-input"] textarea');
  }

  get elementCommentMessageText() {
    return $('[data-testid="comment-message-text"]');
  }

  get btnSubmit() {
    return $('button[type="submit"]');
  }

  async createComment(message: string) {
    await this.textareaCommentMessage.setValue(message);
    await this.btnSubmit.click();
  }

  async open() {
    await blogPage.open();
    await blogPage.btnComments.click();
    await browser.pause(500);
    return browser.getUrl();
  }
}

export const commentPage = new CommentPage();
