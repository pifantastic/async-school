
(function ($) {

  window.random = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  var Task = function (duration) {
    if (typeof duration === 'undefined') {
      duration = random(1, 3);
    }

    this.size = Math.round(duration * 10) + 40;

    this.duration = duration * 1000;
    this.elem = $('<div class="task">')
      .text((this.duration / 1000).toFixed(2))
      .width(this.size + 'px')
      .height(this.size + 'px')
      .css('line-height', this.size + 'px')
      .addClass('size-' + Math.round(this.size));
  };

  Task.prototype = Object.create(Backbone.Events);

  Task.prototype.run = function (cb) {
    var self = this;
    var start = new Date();
    self.trigger('start');

    var interval = setInterval(function () {
      var elapsed = Math.min(self.duration, new Date() - start);
      self.elem.text(((self.duration - elapsed) / 1000).toFixed(2));

      if (elapsed >= self.duration) {
        self.trigger('end');
        clearInterval(interval);
        cb && cb(null);
      }
    }, 16);
  };

  window.Task = Task;

  var CustomTask = function (val) {
    this.val = val;
    this.elem = $('<div class="custom-task">').text(val);
  };

  CustomTask.prototype = Object.create(Backbone.Events);

  window.CustomTask = CustomTask;

  var Example = function (container, tasks) {
    var self = this;
    this.container = $(container);
    this.tasks = [];

    this.container.append(
      '<table>' +
        '<tr>' +
          '<td class="pending"></td>' +
          '<td class="running"></td>' +
          '<td class="finished"></td>' +
        '</tr>' +
      '</table>'
    );

    this.pending = this.container.find('.pending');
    this.running = this.container.find('.running');
    this.finished = this.container.find('.finished');

    if (typeof tasks === 'number') {
      _.range(tasks).forEach(function () {
        self.tasks.push(new Task());
      });
    }
    else {
      self.tasks = tasks;
    }


    this.tasks.forEach(function (task) {
      task.elem.remove().appendTo(self.pending);

      task.on('start', function () {
        task.elem.remove().appendTo(self.running);
      });

      task.on('end', function () {
        task.elem.remove().appendTo(self.finished);
      });
    });
  };

  window.Example = Example;

})(jQuery);
