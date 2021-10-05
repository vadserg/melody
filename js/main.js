$(document).ready(function () {
  var floorCounter = 2; // указатель на текущий этаж
  var floorChoosen = floorCounter.toLocaleString("en-US", {
        // формат номера этажа двузнаковый (03)
        minimumIntegerDigits: 2,
        useGrouping: false,
      }); // выбранный этаж
  var floorPath = $(".home-image path");
  var counterUp = $(".counter-up");
  var counterDown = $(".counter-down");
  var modal = $(".modal");
  var modalCloseButton = $(".modal-close-button");
  var buttonPrimary = $(".button-primary");

  floorPath.on("mouseover", function () {
    // подсвечиваем этаж под указателем
    floorPath.removeClass("current-floor");
    floorCounter = $(this).attr("data-floor"); // текущий этаж под указателем
    $(".counter").text(floorCounter);

    floorPath.on("click", function () {
      // фиксируем выбранный этаж при клике на нем
      floorChoosen = floorCounter;
      $(".counter").text(floorChoosen);
    });
  });

  $(".home-image").mouseout(function () {
    // чичтый уход с картинки с сохранением номера выбранного этажа
    floorCounter = floorChoosen; // текущий этаж равен выбранному (чтобы исключить перескакивания номеров)
    $(".counter").text(floorCounter);
  });

  buttonPrimary.on("click", function () {
    modal.addClass("is-open");
    //$(".modal-counter").text(floorChoosen); // у нас дублирование идет через  класс "counter" в "floor-counter" и в "modal-counter"
  });
  modalCloseButton.on("click", function () {
    modal.removeClass("is-open");
  });
  

  counterUp.on("click", function () {
    // выбираем этаж выше по стрелке
    if (floorCounter < 18) {
      floorCounter++;
      floorChoosen = floorCounter.toLocaleString("en-US", {
        // формат номера этажа двузнаковый (03)
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      $(".counter").text(floorChoosen);
      floorPath.removeClass("current-floor");
      $(`[data-floor=${floorChoosen}]`).toggleClass("current-floor");
    }
  });

  counterDown.on("click", function () {
    // выбираем этаж ниже по стрелке
    if (floorCounter > 2) {
      floorCounter--;
      floorChoosen = floorCounter.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      $(".counter").text(floorChoosen);
      floorPath.removeClass("current-floor"); // сброс подсветки всех этажей
      $(`[data-floor=${floorChoosen}]`).toggleClass("current-floor"); // подсвечиваем только выбранный стрелками этаж
    }
  });
});