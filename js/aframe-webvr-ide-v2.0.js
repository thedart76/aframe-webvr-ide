/*
AFRAME.registerComponent('typed-code', {
	init: function () {
		var vrIDE = document.querySelector('#vr-ide');

		this.el.addEventListener('text-changed', function () {
			var textAnchor = document.querySelector('[text]');
			var typedCode = textAnchor.getAttribute('text').value;
			console.log(typedCode);
		});
	}
});
*/

var geometryType;

AFRAME.registerComponent('compose-code', {	
	init: function () {
		var textAnchor = document.querySelector('[text]');
		var selectedPrimitive = this.el.getAttribute('geometry').primitive;
		
		this.el.addEventListener('Simbol.selected', function () {
			textAnchor.setAttribute('text', {value: '<a-' + selectedPrimitive + '></a-' + selectedPrimitive + '>'});
			
			geometryType = selectedPrimitive;
		});
	}
});

AFRAME.registerComponent('compose-color', {
	init: function () {
		var textAnchor = document.querySelector('[text]');
		var selectedColor = this.el.getAttribute('material').color;
		
		this.el.addEventListener('Simbol.selected', function () {
			console.log(selectedColor);
			textAnchor.setAttribute('text', {value: '<a-' + geometryType + ' color="' + selectedColor + '"></a-' + geometryType + '>'});
		});
	}
});

AFRAME.registerComponent('create-entity', {
	init: function () {
		this.el.addEventListener('Simbol.selected', function () {
			var textAnchor = document.querySelector('[text]');
			var typedCode = textAnchor.getAttribute('text').value;
			
			if (typedCode.startsWith('<a-')) {
				typedCode = generateEntity(typedCode);
			}
			
			const script = document.createElement('script');
			script.text = typedCode;
			
			document.head.appendChild(script).parentNode.removeChild(script);
			document.body.querySelector('[textarea]').components.textarea.textarea.value = '';
		});
	}
});

function generateEntity(value) {
      value = value.replace(/\'/g, '"')
                   .replace(/\n/g, '');
      console.log(value)
      return `var wrapper = document.createElement('a-entity');
      wrapper.innerHTML = '${value}';
      document.querySelector('a-scene').appendChild(wrapper);`;
}

AFRAME.registerComponent('delete-entity', {
	init: function () {
		this.el.addEventListener('Simbol.selected', function () {
			var textAnchor = document.querySelector('[text]');
			var typedCode = textAnchor.getAttribute('text').value;
			var elToBeDeleted = document.querySelector(typedCode);
			var elToBeDeletedID = '#' + elToBeDeleted.getAttribute('id');
//			console.log(elToBeDeletedID);
			
			elToBeDeleted.parentNode.removeChild(elToBeDeleted);
      document.body.querySelector('[textarea]').components.textarea.textarea.value = '';
		});
	}
});

// TEXTAREA component by Brian Peiris
// GitHub repo: https://github.com/brianpeiris/aframe-textarea-component
// Part of the code has been/will be edited
AFRAME.registerComponent('textarea', {
	schema: {
		cols: {type: 'number', default: 400},
		rows: {type: 'number', default: 8},
		wrap: {type: 'number', default: 50},
		color: {type: 'color', default: '#FFFFFF'},
		opacity: {type: 'number', default: 0.8},
		backgroundColor: {type: 'color', default: '#212121'},
		disabledBackgroundColor: {type: 'color', default: 'lightgrey'},
		disabled: {type: 'boolean', default: false},
		text: {type: 'string', default: ''}
	},
	init: function () {
		this.text = null;
		this.lines = [];
		this.lastBlink = 0;
		this.blinkEnabled = !this.data.disabled;
		this.charWidth = this.charHeight = null;
		this.selectionStart = this.selectionEnd = 0;
		this.endIndexInfo = this.startIndexInfo = null;
		this.origin = {
			x: 0,
			y: 0
		};

		this.background = document.createElement('a-plane');
		this.background.setAttribute('material', {
			color: this.data.disabled ? this.data.disabledBackgroundColor : this.data.backgroundColor,
			opacity: this.data.opacity,
			shader: 'flat',
			side: 'double'
		});
		this.el.appendChild(this.background);

		this.textAnchor = document.createElement('a-entity');
		this.el.appendChild(this.textAnchor);
		this.textAnchor.setAttribute('text', {
			whiteSpace: 'pre',
			baseline: 'top',
			anchor: 'center',
			font: 'dejavu',
			wrapCount: this.data.wrap,
			color: this.data.color
		});

		this._initTextarea();

		this._initCursor();

		this.el.addEventListener('textfontset', this._updateCharMetrics.bind(this));
		this.el.addEventListener('char-metrics-changed', this._updateIndexInfo.bind(this));
		this.el.addEventListener('char-metrics-changed', this._updateCursorGeometry.bind(this));
		this.el.addEventListener('text-changed', this._updateLines.bind(this));
		this.el.addEventListener('text-changed', this._updateDisplayText.bind(this));
		this.el.addEventListener('selection-changed', this._updateIndexInfo.bind(this));
		this.el.addEventListener('selection-changed', this._updateCursorStyle.bind(this));
		this.el.addEventListener('selection-changed', this._updateCursorGeometry.bind(this));
		this.el.addEventListener('selection-changed', this._updateHorizontalOrigin.bind(this));
		this.el.addEventListener('lines-changed', this._updateIndexInfo.bind(this));
		this.el.addEventListener('index-info-changed', this._updateOrigin.bind(this));
		this.el.addEventListener('index-info-changed', this._updateCursorGeometry.bind(this));
		this.el.addEventListener('index-info-changed', this._updateHorizontalOrigin.bind(this));
		this.el.addEventListener('origin-changed', this._updateCursorGeometry.bind(this));
		this.el.addEventListener('origin-changed', this._updateDisplayText.bind(this));
		this.el.addEventListener('click', this.focus.bind(this));
    this.el.addEventListener('Simbol.selected', this.focus.bind(this));
    this.el.addEventListener('Simbol.unselected', this.unfocus.bind(this));
	},
	update: function (oldData) {
		if (this.data.text !== oldData.text) {
			this._updateTextarea();
		}

		if (this.data.backgroundColor !== oldData.backgroundColor || this.data.disabledBackgroundColor !== oldData.disabledBackgroundColor) {
			this.background.setAttribute('color', this.data.disabled ? this.data.disabledBackgroundColor : this.data.backgroundColor);
		}

		if (this.data.disabled !== oldData.disabled) {
			this.blinkEnabled = !this.data.disabled;
			this.textarea.disabled = this.data.disabled;
			this.cursorMesh.visible = !this.data.disabled;
			this.background.setAttribute('color', this.data.disabled ? this.data.disabledBackgroundColor : this.data.backgroundColor);
		}
	},
	focus: function () {
    const simbolEl = document.querySelector('a-simbol');
    if (simbolEl) {
      const simbolComponent = simbolEl.components.simbol;
      if (simbolComponent) {
         const simbol = simbolComponent.simbol;
         simbol.locomotion.disableTranslation();
      }
    }
		this.textarea.focus();
	},
  unfocus: function() {
    const simbolEl = document.querySelector('a-simbol');
    if (simbolEl) {
      const simbolComponent = simbolEl.components.simbol;
      if (simbolComponent) {
         const simbol = simbolComponent.simbol;
         simbol.locomotion.enableTranslation();
      }
    }
  },
	_initTextarea: function () {
		this.textarea = document.createElement('textarea');
		document.body.appendChild(this.textarea);
		this._updateTextarea();
	},
	_updateTextarea: function () {
		this.textarea.style.whiteSpace = 'pre';
		this.textarea.style.overflow = 'hidden';
		this.textarea.style.opacity = '0';

		this.textarea.cols = this.data.cols;
		this.textarea.rows = this.data.rows;
		this.textarea.value = this.data.text;
		this.textarea.selectionStart = 0;
		this.textarea.selectionEnd = 0;

		this._updateIndexInfo();
	},
	_initCursor: function () {
		this.cursor = document.createElement('a-entity');
		this.cursorGeo = new THREE.PlaneGeometry(1, 1);
		this.cursorMat = new THREE.MeshBasicMaterial({
			color: 'black',
			transparent: true,
			opacity: 0.5
		});
		this.cursorMesh = new THREE.Mesh(this.cursorGeo, this.cursorMat);
		window.cursorMesh = this.cursorMesh;
		this.cursor.setObject3D('mesh', this.cursorMesh);
		this.el.appendChild(this.cursor);
	},
	_emit: function (eventName, detail) {
		this.el.emit(eventName, detail);
	},
	_updateCharMetrics: function (event) {
		const layout = this.textAnchor.components.text.geometry.layout;
		const fontWidthFactor = event.detail.fontObj.widthFactor;
		this.charWidth = fontWidthFactor * this.textAnchor.object3DMap.text.scale.x;
		this.charHeight = this.charWidth * layout.lineHeight / fontWidthFactor;
		this.textAnchor.setAttribute('position', {
			x: 0,
			y: this.charHeight * this.data.rows / 2,
			z: 0
		});
		this.background.setAttribute('scale', {
			x: 1.05,
			y: this.charHeight * this.data.rows * 1.05,
			z: 1
		});
		this.background.setAttribute('position', {
			x: 0,
			y: 0,
			z: 0
		});
		this._emit('char-metrics-changed');
	},
	_checkAndUpdateSelection: function () {
		if (
			this.selectionStart === this.textarea.selectionStart &&
			this.selectionEnd === this.textarea.selectionEnd
		) {
			return;
		}

		const lastStart = this.selectionStart;
		const lastEnd = this.selectionEnd;

		this.selectionStart = this.textarea.selectionStart;
		this.selectionEnd = this.textarea.selectionEnd;

		this._emit('selection-changed', {
			start: {
				old: lastStart,
				new: this.selectionStart,
				changed: this.selectionStart !== lastStart
			},
			end: {
				old: lastEnd,
				new: this.selectionEnd,
				changed: this.selectionEnd !== lastEnd
			}
		});
	},
	tick: function (time) {
		if (time - this.lastBlink > 500 && this.blinkEnabled) {
			this.cursorMesh.visible = !this.cursorMesh.visible;
			this.lastBlink = time;
		}
		this._checkAndUpdateSelection();
		this._checkAndUpdateText();
	},
	_getIndexInfo: function (lineIndex, textIndex) {
		const y = Math.max(0, lineIndex);
		const line = this.lines[y];
		const x = textIndex - line.start;
		return {
			line: line,
			x: x * this.charWidth,
			y: -this.charHeight * y + -this.charHeight / 2
		};
	},
	_updateIndexInfo: function () {
		if (!this.lines.length) {
			return;
		}
		const lastStart = this.startIndexInfo && this.startIndexInfo.line.index;
		const lastEnd = this.endIndexInfo && this.endIndexInfo.line.index;
		this.startIndexInfo = null;
		this.endIndexInfo = null;
		var i;
		var startChanged = false;
		var endChanged = false;
		for (i = 0; i <= this.lines.length; i++) {
			const prevLine = this.lines[i - 1];
			const lineStart = i === this.lines.length ? (prevLine.start + prevLine.length + 1) : this.lines[i].start;
			if (lineStart > this.selectionStart && !this.startIndexInfo) {
				this.startIndexInfo = this._getIndexInfo(i - 1, this.selectionStart);
				if (this.startIndexInfo.line.index !== lastStart) {
					startChanged = true;
				}
			}
			if (lineStart > this.selectionEnd) {
				this.endIndexInfo = this._getIndexInfo(i - 1, this.selectionEnd);
				if (this.endIndexInfo.line.index !== lastEnd) {
					endChanged = true;
				}
				break;
			}
		}
		if (startChanged || endChanged) {
			this._emit('index-info-changed', {
				start: {
					changed: startChanged
				},
				end: {
					changed: endChanged
				}
			});
		}
	},
	_updateOrigin: function (event) {
		var changed = false;
		if (event.detail.end.changed) {
			const end = this.origin.y + this.data.rows - 1;
			if (this.endIndexInfo.line.index > end) {
				this.origin.y = this.endIndexInfo.line.index + 1 - this.data.rows;
				changed = true;
			} else if (this.endIndexInfo.line.index < this.origin.y) {
				this.origin.y = this.endIndexInfo.line.index;
				changed = true;
			}
		}
		if (event.detail.start.changed) {
			if (this.startIndexInfo.line.index < this.origin.y) {
				this.origin.y = this.startIndexInfo.line.index;
				changed = true;
			}
		}
		if (changed) {
			this._emit('origin-changed');
		}
	},
	_updateHorizontalOrigin: function (event) {
		if (!this.endIndexInfo) {
			return;
		}
		var changed = true;
		if (event.detail.end.changed) {
			const endIndex = this.selectionEnd - this.endIndexInfo.line.start;
			if (endIndex > this.origin.x + this.data.cols) {
				this.origin.x = endIndex - this.data.cols;
				changed = true;
			} else if (endIndex < this.origin.x) {
				this.origin.x = endIndex;
				changed = true;
			}
		}
		const startIndex = this.selectionStart - this.startIndexInfo.line.start;
		if (event.detail.start.changed) {
			if (startIndex > this.origin.x + this.data.cols) {
				this.origin.x = startIndex - this.data.cols;
				changed = true;
			} else if (startIndex < this.origin.x) {
				this.origin.x = startIndex;
				changed = true;
			}
		}
		if (changed) {
			this._emit('origin-changed');
		}
	},
	_updateCursorStyle: function () {
		if (this.selectionStart === this.selectionEnd) {
			this.blinkEnabled = true;
			this.cursorMat.color.setStyle('black');
			this.cursorMat.transparent = false;
		} else {
			this.blinkEnabled = false;
			this.cursorMat.color.setStyle('white');
			this.cursorMesh.visible = true;
			this.cursorMat.transparent = true;
		}
	},
	_updateCursorGeometry: function () {
		if (!this.startIndexInfo) {
			return;
		}
		this.cursorMesh.geometry = new THREE.Geometry();
		const startLine = Math.max(this.origin.y, this.startIndexInfo.line.index);
		const endLine = Math.min(this.origin.y + this.data.rows - 1, this.endIndexInfo.line.index);
		const maxIndex = this.origin.x + this.data.cols;
		for (var i = startLine; i <= endLine; i++) {
			const mesh = new THREE.Mesh(this.cursorGeo, this.cursorMat);
			var size;
			var offset = 0;
			if (endLine === startLine) {
				offset = Math.max(this.origin.x, this.selectionStart - this.startIndexInfo.line.start);
				const end = Math.min(maxIndex, this.selectionEnd - this.startIndexInfo.line.start);
				size = Math.max(0.2, end - offset);
			} else {
				var end;
				if (i === this.startIndexInfo.line.index) {
					offset = Math.max(this.origin.x, this.selectionStart - this.startIndexInfo.line.start);
					end = Math.min(maxIndex, this.startIndexInfo.line.length);
				} else if (i === this.endIndexInfo.line.index) {
					offset = this.origin.x;
					end = Math.min(maxIndex, this.selectionEnd - this.endIndexInfo.line.start);
				} else {
					offset = this.origin.x;
					end = Math.min(maxIndex, this.lines[i].length);
				}
				size = end - offset;
			}
			mesh.scale.set(
				this.charWidth * size,
				this.charHeight,
				1
			);
			mesh.position.set(
				offset * this.charWidth + this.charWidth * size / 2 - 0.5 - this.origin.x * this.charWidth, -i * this.charHeight + (this.charHeight * this.data.rows) / 2 - this.charHeight / 2 + this.origin.y * this.charHeight,
				0.002
			);
			this.cursorMesh.geometry.mergeMesh(mesh);
		}
		this.cursorMesh.geometry.verticesNeedUpdate = true;
	},
	_updateLines: function () {
		this.lines = [];
		const lines = this.text.split('\n');
		var counter = 0;
		for (var i = 0; i < lines.length; i++) {
			this.lines[i] = {
				index: i,
				length: lines[i].length,
				start: counter
			};
			counter += lines[i].length + 1;
		}
		this._emit('lines-changed');
	},
	_getViewportText: function () {
		return this.text.split('\n').slice(this.origin.y, this.origin.y + this.data.rows)
			.map(function (line) {
				return line.substr(this.origin.x, this.data.cols) || ' ';
			}.bind(this)).join('\n');
	},
	_updateDisplayText: function () {
		this.textAnchor.setAttribute('text', {
			value: this._getViewportText()
		});
	},
	_checkAndUpdateText: function () {
		const text = this.textarea.value;
		if (text === this.text) {
			return;
		}
		this.text = text;
		this._emit('text-changed');
	}
});