import * as React from "react";
import { QuestionFileModel } from "survey-core";
import { SurveyActionBar } from "./components/action-bar/action-bar";
import { SvgIcon } from "./components/svg-icon/svg-icon";
import { SurveyQuestionElementBase } from "./reactquestion_element";
import { ReactQuestionFactory } from "./reactquestion_factory";
import { attachKey2click } from "./reactSurvey";

export class SurveyQuestionFile extends SurveyQuestionElementBase {
  constructor(props: any) {
    super(props);
  }
  protected get question(): QuestionFileModel {
    return this.questionBase as QuestionFileModel;
  }
  protected renderElement(): JSX.Element {
    var preview = this.renderPreview();
    var fileInput: JSX.Element | null = null;
    var fileDecorator = this.renderFileDecorator();
    var clearButton = this.renderClearButton(
      this.question.showRemoveButton
    );
    var clearButtonBottom = this.renderClearButton(
      this.question.showRemoveButtonBottom
    );

    let mobileFileNavigator = this.question.mobileFileNavigatorVisible?(<SurveyActionBar model = {this.question.mobileFileNavigator}></SurveyActionBar>):null;
    fileInput = (
      this.isDisplayMode ?
        <input
          type="file"
          disabled={this.isDisplayMode}
          className={!this.isDisplayMode ? this.question.cssClasses.fileInput : this.question.getReadOnlyFileCss()}
          id={this.question.inputId}
          ref={input => (this.setControl(input))}
          style={!this.isDisplayMode ? {} : { color: "transparent" }}
          onChange={!this.isDisplayMode ? this.question.doChange : (() => {})}
          multiple={this.question.allowMultiple}
          placeholder={this.question.title}
          accept={this.question.acceptedTypes}
        />
        :
        <input
          type="file"
          disabled={this.isDisplayMode}
          tabIndex={-1}
          className={!this.isDisplayMode ? this.question.cssClasses.fileInput : this.question.getReadOnlyFileCss()}
          id={this.question.inputId}
          ref={input => (this.setControl(input))}
          style={!this.isDisplayMode ? {} : { color: "transparent" }}
          onChange={!this.isDisplayMode ? this.question.doChange : (() => {})}
          aria-required={this.question.ariaRequired}
          aria-label={this.question.ariaLabel}
          aria-invalid={this.question.ariaInvalid}
          aria-describedby={this.question.ariaDescribedBy}
          multiple={this.question.allowMultiple}
          title={this.question.inputTitle}
          accept={this.question.acceptedTypes}
          capture={this.question.renderCapture}
        />
    );
    return (
      <div className={this.question.fileRootCss}>
        {fileInput}
        <div
          className={this.question.cssClasses.dragArea}
          onDrop={this.question.onDrop}
          onDragOver={this.question.onDragOver}
          onDragLeave={this.question.onDragLeave}
          onDragEnter={this.question.onDragEnter}
        >
          {fileDecorator}
          {clearButton}
          {preview}
          {clearButtonBottom}
          {mobileFileNavigator}
        </div>
      </div>
    );
  }
  protected renderFileDecorator(): JSX.Element {
    const questionCss = this.question.cssClasses;
    let noFileChosen: JSX.Element | null = null;
    let chooseFile: JSX.Element | null = null;
    chooseFile = this.question.isReadOnly ? null : attachKey2click(
      <label
        role="button"
        tabIndex={0}
        className={this.question.getChooseFileCss()}
        htmlFor={this.question.inputId}
        aria-label={this.question.chooseButtonText}
      >
        <span>{this.question.chooseButtonText}</span>
        {(!!this.question.cssClasses.chooseFileIconId) ? <SvgIcon title={this.question.chooseButtonText} iconName={this.question.cssClasses.chooseFileIconId} size={"auto"}></SvgIcon>: null }
      </label>
    );
    if (this.question.isEmpty()) {
      noFileChosen = (
        <span className={this.question.cssClasses.noFileChosen}>
          {this.question.noFileChosenCaption}
        </span>
      );
    }
    return (
      <div
        className={this.question.getFileDecoratorCss()}
      >
        <span className={this.question.cssClasses.dragAreaPlaceholder}>{this.question.dragAreaPlaceholder}</span>
        <div className={this.question.cssClasses.wrapper}>
          {chooseFile}
          {noFileChosen}
        </div>
      </div>
    );
  }
  protected renderClearButton(className: string): JSX.Element | null {
    return className ? (
      <button type="button" onClick={this.question.doClean} className={className}>
        <span>{this.question.clearButtonCaption}</span>
        {(!!this.question.cssClasses.removeButtonIconId) ? <SvgIcon iconName={this.question.cssClasses.removeButtonIconId} size={"auto"} title={this.question.clearButtonCaption}></SvgIcon>: null }
      </button>
    ) : null;
  }
  protected renderFileSign(className: string, val: any): JSX.Element | null {
    if(!className || !val.name) return null;
    return (
      <div className={className}>
        <a
          href={val.content}
          onClick={event => {
            this.question.doDownloadFile(event, val);
          }}
          title={val.name}
          download={val.name}
          style={{ width: this.question.imageWidth }}
        >
          {val.name}
        </a>
      </div>
    );
  }
  protected renderPreview(): JSX.Element | null {
    if (!this.question.previewValue || !this.question.previewValue.length) return null;
    var previews = this.question.previewValue.map((val, index) => {
      if (!val) return null;
      return (
        <span
          key={this.question.inputId + "_" + index}
          className={this.question.cssClasses.preview}
          style={{ display: this.question.isPreviewVisible(index) ? undefined : "none" }}
        >
          {this.renderFileSign(this.question.cssClasses.fileSign, val)}
          <div className={this.question.cssClasses.imageWrapper}>
            {this.question.canPreviewImage(val) ? (
              <img
                src={val.content}
                style={{ height: this.question.imageHeight, width: this.question.imageWidth }}
                alt="File preview"
              />
            ) : (this.question.cssClasses.defaultImage?(
              <SvgIcon iconName={this.question.cssClasses.defaultImageIconId} size={"auto"} className={this.question.cssClasses.defaultImage}></SvgIcon>
            ):null)}
            {val.name && !this.question.isReadOnly ? (
              <div className={this.question.cssClasses.removeFileButton} onClick={() => this.question.doRemoveFile(val)}>
                <span
                  className={this.question.cssClasses.removeFile}
                >
                  {this.question.removeFileCaption}
                </span>
                {(this.question.cssClasses.removeFileSvgIconId) ?
                  (<SvgIcon title={this.question.removeFileCaption} iconName={this.question.cssClasses.removeFileSvgIconId} size={"auto"} className={this.question.cssClasses.removeFileSvg}></SvgIcon>): null }
              </div>
            ) : null}
          </div>
          {this.renderFileSign(this.question.cssClasses.fileSignBottom, val)}
        </span>
      );
    });
    return <div className={this.question.cssClasses.fileList || undefined}>{previews}</div>;
  }
}

ReactQuestionFactory.Instance.registerQuestion("file", props => {
  return React.createElement(SurveyQuestionFile, props);
});
