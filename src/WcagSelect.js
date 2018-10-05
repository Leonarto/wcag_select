import React from 'react';
import PropTypes from 'prop-types';
import './WcagSelect.css';

export default class WcagSelect extends React.Component {
  static defaultProps = {
    options: [],
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    options: PropTypes.array,
    className: PropTypes.string,
    onKeyPress: PropTypes.func,
    onClick: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func
  };

  state = {
    opened: false
  };

  handleArrowDown = () => {
    const { options, value, onChange } = this.props;
    let index = options.findIndex(opt => {
      return opt.value === value;
    });
    index++;
    if (index === options.length) {
      index = 0
    }
    onChange(options[index]);
  };

  handleArrowUp = () => {
    const { options, value, onChange } = this.props;
    let index = options.findIndex(opt => {
      return opt.value === value;
    });
    index--;
    if (index === -1) {
      index = options.length -1
    }
    onChange(options[index]);
  };

  toogleOpenedKeypressed = (e) => {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(e);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const wasOpened = this.state.opened;
      this.toogleOpened();
      if (wasOpened) {
        document.querySelector(`#${this.props.id}`).focus();
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this.handleArrowDown();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      this.handleArrowUp();
    }
    if (e.key === 'Tab') {
      if (this.state.opened) {
        this.toogleOpened();
      }
    }
  };

  toogleOpenedBlur = (e) => {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }

    if (this.state.opened) {
      this.toogleOpened();
    }
  };

  toogleOpenedClick = (e) => {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
    this.toogleOpened();
  };

  toogleOpened = () => {
    this.setState({
      opened: !this.state.opened
    });
  };

  onChange = (opt) => {
    return () => {
      document.querySelector(`#${this.props.id}`).focus();
      if (this.props.onChange) {
        this.props.onChange(opt)
      }
    }
  };

  renderOption = (opt) => {
    const { id, value } = this.props;
    let ariaSelected = null;
    let selected = null;
    if (opt.value === value) {
      ariaSelected = true;
      selected = 'selected';
    }
    if (opt.constructor === Array) {
      return (
          <span
              id={`${id}-option-${opt[0]}`}
              className={selected}
              data-value={opt[0]} key={opt[0]}
              onClick={this.onChange(opt)}
              role="option"
              aria-selected={ariaSelected}
          >
            {opt[1]}
          </span>
      );
    } else if (typeof opt === 'object') {
      return (
          <span
              id={`${id}-option-${opt.value}`}
              className={selected}
              data-value={opt.value}
              key={opt.value}
              onClick={this.onChange(opt)}
              role="option"
              aria-selected={ariaSelected}
          >
            {opt.label}
          </span>
      );
    } else {
      return null;
    }
  };

  renderOptions = () => {
    return this.props.options.map((opt) => this.renderOption(opt));
  };

  renderDisplayer = () => {
    const { options, value } = this.props;
    const { opened } = this.state;
    const selectedItem = options.find((opt) => {
      if (opt.constructor === Array) {
          return opt[0] === value;
        } else if (typeof opt === 'object') {
          return opt.value === value;
        } else {
          return false;
        }
    });

    return (
        <div className={`displayer ${opened ? 'opened' : ''}`} tabIndex={-1}>
          <div>
            {selectedItem.label}
          </div>
          <div className={`arrow-container ${opened ? 'opened' : ''}`}>
            <svg viewBox="0 0 10 8"><path d="M 0 0 10 0 5 8 Z"/></svg>
          </div>
        </div>
    )
  };

  render() {
    const { options, className, id, value } = this.props;
    const { opened } = this.state;
    let selectAttrs = {...this.props};
    delete selectAttrs.options;
    delete selectAttrs.className;

    return (
        <div
            id={id}
            role="combobox"
            aria-controls={`${id}-options`}
            aria-expanded={opened}
            aria-haspopup="listbox"
            className={`select ${opened ? 'opened' : ''} ${className || ''}`}
            onClick={this.toogleOpenedClick}
            onKeyDown={this.toogleOpenedKeypressed}
            tabIndex={0}
            aria-activedescendant={`${id}-options`}
        >
          {this.renderDisplayer()}
          <div hidden id={`${id}-input-description`}>To store the value and be retrieved by a form if desired</div>
          <input
              type="text"
              name={id}
              aria-labelledby={`${id}-input-description`}
              value={value}
              autoComplete="off"
              autoCorrect="off"
              onChange={() => {}}
              tabIndex={-1}
              aria-hidden
              readOnly
          />
          <div hidden id={`${id}-options-description`}>Select one of {options.length} elements</div>
          <div
              className="options"
              id={`${id}-options`}
              aria-labelledby={`${id}-options-description`}
              hidden={!opened}
              aria-hidden={false}
              onBlur={this.toogleOpenedBlur}
              tabIndex={0}
              role='listbox'
              aria-activedescendant={`${id}-option-${value}`}
          >
            {this.renderOptions()}
          </div>
        </div>
    )
  }
}