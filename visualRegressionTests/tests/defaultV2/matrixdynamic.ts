import { Selector, ClientFunction } from "testcafe";
import { url, frameworks, initSurvey, url_test, explicitErrorHandler, applyTheme, takeElementScreenshot, wrapVisualTest, resetFocusToBody, resetHoverToBody } from "../../helper";

const title = "Matrixdynamic Screenshot";

fixture`${title}`.page`${url}`.beforeEach(async (t) => {

});

const theme = "defaultV2";

frameworks.forEach(framework => {
  fixture`${framework} ${title} ${theme}`
    .page`${url_test}${theme}/${framework}`
    .beforeEach(async t => {
      await explicitErrorHandler();
      await applyTheme(theme);
    });
  test("Matrixdynamic empty placeholder", async (t) => {
    await wrapVisualTest(t, async (t, comparer) => {
      await t.resizeWindow(1920, 1080);
      await initSurvey(framework, {
        showQuestionNumbers: "off",
        elements: [
          {
            type: "matrixdynamic",
            name: "frameworks",
            title: "Please tells us your opinion about JavaScript MVVM frameworks.",
            hideColumnsIfEmpty: true,
            emptyRowsText: "There is no records yet.\nClick the button below to add a new record.",
            addRowText: "Add New Record",
            rowCount: 0,
            maxWidth: "768px",
            minWidth: "768px",
            width: "768px"
          }
        ]
      });
      const matrixdynamicRoot = Selector(".sd-question");
      await takeElementScreenshot("matrixdynamic-empty.png", matrixdynamicRoot, t, comparer);
    });
  });

  test("Check Matrixdynamic", async (t) => {
    await wrapVisualTest(t, async (t, comparer) => {
      await t.resizeWindow(1920, 1080);
      await initSurvey(framework, {
        showQuestionNumbers: "off",
        elements: [
          {
            type: "matrixdynamic",
            name: "frameworks",
            title: "Please tells us your opinion about JavaScript MVVM frameworks.",
            columns: [
              {
                "name": "Column 1",
                "title": "Framework"
              },
              {
                "name": "Column 2",
                "title": "How long do you use it?"
              },
              {
                "name": "Column 3",
                "title": "What is main strength?"
              }
            ],
            addRowText: "Add a New Record",
            rowCount: 3,
            maxWidth: "768px",
            minWidth: "768px",
            width: "768px"
          },
        ]
      });

      const matrixdynamicRoot = Selector(".sd-question");
      await resetFocusToBody();
      await takeElementScreenshot("matrixdynamic.png", matrixdynamicRoot, t, comparer);
    });
  });

  test("Check Matrixdynamic vertical", async (t) => {
    await wrapVisualTest(t, async (t, comparer) => {
      await t.resizeWindow(1920, 1080);
      await initSurvey(framework, {
        showQuestionNumbers: "off",
        elements: [
          {
            type: "matrixdynamic",
            name: "Current Level of Function",
            columnLayout: "vertical",
            rowCount: 3,
            columns: [
              {
                name: "Date",
                title: "Date",
                cellType: "text",
                inputType: "date"
              }, {
                name: "AmbDistance",
                title: "Amb Distance",
                cellType: "text"
              }, {
                name: "Amb Assistance",
                cellType: "dropdown",
                choices: ["D", "MAX", "MOD", "MIN"]
              }, {
                name: "Standing Tolerance",
                cellType: "text"
              }, {
                name: "UE Strength",
                cellType: "text"
              }, {
                name: "Cognitive Function",
                cellType: "comment"
              }
            ],
            choices: [1],
            cellType: "comment",
            addRowText: "Add Date +",
            removeRowText: "Remove",
            maxWidth: "800px",
            minWidth: "800px",
            width: "800px" }
        ]
      });

      const matrixdynamicRoot = Selector(".sd-question");
      await resetFocusToBody();
      await takeElementScreenshot("matrixdynamic-vertical.png", matrixdynamicRoot, t, comparer);
    });
  });

  test("Check Matrixdynamic errors inside cells", async (t) => {
    await wrapVisualTest(t, async (t, comparer) => {
      await t.resizeWindow(1920, 1080);
      await initSurvey(framework, {
        showQuestionNumbers: "off",
        elements: [
          {
            type: "matrixdynamic",
            name: "frameworks",
            title: "Please tells us your opinion about JavaScript MVVM frameworks.",
            columns: [
              {
                "name": "Column 1",
                "isRequired": true,
                "title": "Framework"
              },
              {
                "name": "Column 2",
                "title": "How long do you use it?"
              },
              {
                "name": "Column 3",
                "isRequired": true,
                "title": "What is main strength?"
              },
            ],
            addRowText: "Add a New Record",
            rowCount: 3,
            maxWidth: "704px",
            minWidth: "704px",
            width: "704px"
          },
        ]
      });
      const matrixdynamicRoot = Selector(".sd-question");
      await t.click(".sd-navigation__complete-btn");
      await resetFocusToBody();
      await resetHoverToBody(t);

      await takeElementScreenshot("matrixdynamic-errors-in-cell.png", matrixdynamicRoot, t, comparer);
    });
  });
  test("Check Matrixdynamic errors inside cells bottom", async (t) => {
    await wrapVisualTest(t, async (t, comparer) => {
      await t.resizeWindow(1920, 1080);
      await initSurvey(framework, {
        questionErrorLocation: "bottom",
        showQuestionNumbers: "off",
        elements: [
          {
            type: "matrixdynamic",
            name: "frameworks",
            title: "Please tells us your opinion about JavaScript MVVM frameworks.",
            columns: [
              {
                "name": "Column 1",
                "isRequired": true,
                "title": "Framework"
              },
              {
                "name": "Column 2",
                "title": "How long do you use it?"
              },
              {
                "name": "Column 3",
                "isRequired": true,
                "title": "What is main strength?"
              },
            ],
            addRowText: "Add a New Record",
            rowCount: 3,
            maxWidth: "704px",
            minWidth: "704px",
            width: "704px"
          },
        ]
      });
      const matrixdynamicRoot = Selector(".sd-question");
      await t.click(".sd-navigation__complete-btn");
      await resetFocusToBody();
      await resetHoverToBody(t);

      await takeElementScreenshot("matrixdynamic-errors-in-cell-bottom.png", matrixdynamicRoot, t, comparer);
    });
  });

  test("Check Matrixdynamic with allowRowsDragAndDrop", async (t) => {
    await wrapVisualTest(t, async (t, comparer) => {
    //todo
      if (framework === "vue" || framework === "angular") {
        return;
      }
      await t.resizeWindow(1280, 1100);
      await initSurvey(framework, { "pages": [{ "name": "page1", "elements": [{ "type": "matrixdynamic", "name": "relatives", "title": "Please enter all blood relatives you know", "columns": [{ "name": "relativeType", "title": "Relative", "cellType": "dropdown", "isRequired": true, "choices": ["father", "mother", "brother", "sister", "son", "daughter"] }, { "name": "firstName", "title": "First name", "cellType": "text", "isRequired": true }, { "name": "lastName", "title": "Last name", "cellType": "text", "isRequired": true }], "detailElements": [{ "type": "radiogroup", "name": "isalive", "startWithNewLine": false, "title": "Alive?", "isRequired": true, "choices": ["Yes", "No"], "colCount": 0 }, { "type": "dropdown", "name": "liveage", "visibleIf": "{row.isalive} = 'Yes'", "startWithNewLine": false, "title": "Age", "isRequired": true, "choicesMin": 1, "choicesMax": 115 }, { "type": "dropdown", "name": "deceasedage", "visibleIf": "{row.isalive} = 'No'", "startWithNewLine": false, "title": "Deceased Age", "isRequired": true, "choices": [{ "value": -1, "text": "Unknown" }], "choicesMin": 1, "choicesMax": 115 }, { "type": "radiogroup", "name": "causeofdeathknown", "visibleIf": "{row.isalive} = 'No'", "startWithNewLine": false, "title": "Cause of Death Known?", "isRequired": true, "choices": ["Yes", "No"], "colCount": 0 }, { "type": "text", "name": "causeofdeath", "visibleIf": "{row.isalive} = 'No' and {row.causeofdeathknown} = 'Yes'", "startWithNewLine": false, "title": "Cause of Death", "isRequired": true }], "detailPanelMode": "underRow", "addRowText": "Add a blood relative", "removeRowText": "Remove the relative", "allowRowsDragAndDrop": true }] }], "checkErrorsMode": "onValueChanged" });

      const matrixdynamicRoot = Selector(".sd-question");
      await resetFocusToBody();
      await takeElementScreenshot("matrixdynamic-allowRowsDragAndDrop.png", matrixdynamicRoot, t, comparer);
    });
  });

  test("Check Matrixdynamic with showInMultipleColumns", async (t) => {
    await wrapVisualTest(t, async (t, comparer) => {
      await t.resizeWindow(1280, 1100);
      await initSurvey(framework, {
        "showQuestionNumbers": "off",
        "elements": [
          {
            "type": "matrixdropdown",
            "name": "Feelings",
            "title": "What do your feel?",

            "columns": [
              {
                "name": "col1",
                "cellType": "radiogroup",
                "showInMultipleColumns": true,
                "isRequired": true,
                "choices": [
                  "Strongly disagree",
                  "Disagree",
                  "Neutral",
                  "Agree",
                  "Strongly agree"
                ]
              },
            ],
            "rows": [
              "Excited",
              "Enthusiastic",
              "Open"
            ]
          }
        ]
      });

      const matrixdynamicRoot = Selector(".sd-question");
      await resetFocusToBody();
      await takeElementScreenshot("matrixdynamic-show-in-multiple-columns.png", matrixdynamicRoot, t, comparer);
    });
  });
});