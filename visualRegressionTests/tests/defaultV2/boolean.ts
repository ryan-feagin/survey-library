import { Selector, ClientFunction } from "testcafe";
import { url, frameworks, initSurvey, setOptions, url_test, explicitErrorHandler, takeElementScreenshot, wrapVisualTest, resetFocusToBody } from "../../helper";

const title = "Boolean Screenshot";

fixture`${title}`.page`${url}`.beforeEach(async (t) => {

});

const applyTheme = ClientFunction(theme => {
  (<any>window).Survey.StylesManager.applyTheme(theme);
});

const theme = "defaultV2";

frameworks.forEach(framework => {
  fixture`${framework} ${title} ${theme}`
    .page`${url_test}${theme}/${framework}`.beforeEach(async t => {
    await explicitErrorHandler();
    await applyTheme(theme);
  });

  test("Check boolean question", async (t) => {
    await wrapVisualTest(t, async (t, comparer) => {
      await t.resizeWindow(1920, 1080);
      await initSurvey(framework, {
        questions: [
          {
            type: "boolean",
            name: "boolean_question",
          },
        ]
      });
      const questionRoot = Selector(".sd-question--boolean");
      await t.wait(1000);
      await resetFocusToBody();
      await takeElementScreenshot("boolean-question-indeterminate.png", questionRoot, t, comparer);

      await t.hover(".sd-boolean__thumb-ghost");
      await takeElementScreenshot("boolean-question-indeterminate-hovered.png", questionRoot, t, comparer);

      await t.click(Selector(".sv-string-viewer").withText("No"));
      await takeElementScreenshot("boolean-question-clicked.png", questionRoot, t, comparer);

      await t.hover(Selector(".sd-boolean__thumb-ghost").nth(1));
      await takeElementScreenshot("boolean-question-clicked-hovered.png", questionRoot, t, comparer);

      await t.hover(".sd-boolean__thumb-ghost");
      await setOptions("boolean_question", { readOnly: true });
      await takeElementScreenshot("boolean-question-clicked-disabled.png", questionRoot, t, comparer);

      await setOptions("boolean_question", { value: null });
      await takeElementScreenshot("boolean-question-disabled.png", questionRoot, t, comparer);
    });
  });

  test("Check radio boolean question", async (t) => {
    await wrapVisualTest(t, async (t, comparer) => {
      await t.resizeWindow(1920, 1080);
      await initSurvey(framework, {
        questions: [
          {
            type: "boolean",
            name: "boolean_question",
            maxWidth: "768px",
            minWidth: "768px",
            width: "768px",
            renderAs: "radio"
          },
        ]
      });
      const questionRoot = Selector(".sd-question--boolean");
      await t.wait(1000);
      await takeElementScreenshot("boolean-radio-question.png", questionRoot, t, comparer);

      await t
        .click(Selector(".sv-string-viewer").withText("No"))
        .expect(Selector("input[type=radio]").nth(0).checked).ok();
      await takeElementScreenshot("boolean-radio-question-clicked.png", questionRoot, t, comparer);

      await t
        .click(Selector("body"), { offsetY: 400 })
        .expect(Selector("input[type=radio]").nth(0).focused).notOk();
      await takeElementScreenshot("boolean-radio-question-unfocused.png", questionRoot, t, comparer);
    });
  });
  test("Check boolean question word-wrap", async (t) => {
    await wrapVisualTest(t, async (t, comparer) => {
      await t.resizeWindow(1920, 1080);
      await initSurvey(framework, {
        questions: [
          {
            type: "boolean",
            name: "boolean_question",
            "labelTrue": "On-site",
            "labelFalse": "Remote",
            defaultValue: true
          },
        ]
      });
      const questionRoot = Selector(".sd-question--boolean");
      await t.wait(1000);
      await takeElementScreenshot("boolean-question-word-wrap.png", questionRoot, t, comparer);
    });
  });
});

