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

    var colors = {
      'selected': ['#f33', '#b33', '#933', '#833', '#733', '#633'],
      'unselected': ['#fff', '#bbb', '#999', '#888', '#777', '#666']
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
      this.el.style.backgroundColor = colors[this.selected ? 'selected' : 'unselected'][this.level];
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
      for (j = 0; j < 11; j++) {
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
        for (k = 0; k < 11; k++) {
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
