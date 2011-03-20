(function() {
  var d = document;

  d.addEventListener("DOMContentLoaded", function() {
    var Cell = function(file) {
      this.file = file;
      this.audio = new Audio(file);
      this.level = 5;
      this.el = this.createEl();
      this.selected = false;
      this.updateBackgroundColor();
    };

    var colorForLevel = function(lvl, selected) {
      if (selected) {
        switch (lvl) {
          case 5: return '#633';
          case 4: return '#733';
          case 3: return '#833';
          case 2: return '#933';
          case 1: return '#b33';
          case 0: return '#f33';
        }
      } else {
        switch (lvl) {
          case 5: return '#666';
          case 4: return '#777';
          case 3: return '#888';
          case 2: return '#999';
          case 1: return '#bbb';
          case 0: return '#fff';
        }
      }
    };

    Cell.prototype.createEl = function() {
      var el = d.createElement('div'),
      s = el.style,
      that = this;
      s.cursor          = 'pointer';
      s.width =
        s.height        = '20';
      s.margin          = '2';
      s.cssFloat        = 'left';

      el.addEventListener("click", function() {
        that.selected = !that.selected;
        that.updateBackgroundColor();
      }, false);
      return el;
    };

    Cell.prototype.updateBackgroundColor = function() {
      this.el.style.backgroundColor = colorForLevel(this.level, this.selected);
    };


    Cell.prototype.pulse = function(lvl) {
      this.level = lvl;
      this.updateBackgroundColor();

      if (lvl === 0 && this.selected) {
        this.audio.play();
        this.audio = new Audio(this.file);
      }
    };

    var body = d.body;
    s = body.style;
    s.margin          = '5';
    s.backgroundColor = '#222';


    var i;
    var cols = [];
    for (i = 0; i < 20; i++) {
      var colDiv = d.createElement('div'),
      col = [],
      st = colDiv.style;

      cols.push(col);
      st.cssFloat = 'left';
      st.width = '24';
      st.height = '220';

      var j;
      for (j = 0; j < 3; j++) {
        var c = new Cell(j + '.wav');
        colDiv.appendChild(c.el);
        col.push(c);
      }

      body.appendChild(colDiv);
    }

    i = 0;

    setInterval(function() {

      var j;
      for (j = i - 5; j <= i; j++) {
        var k;
        for (k = 0; k < 3; k++) {
          cols[j < 0 ? j + 20 : j][k].pulse(i - j);
        }
      }

      i ++;
      if ( i > 19 ) {
        i = 0;
      }
    }, 200);
  }, false);
})();
