// line 
let line = document.querySelector('.words_line .line');

scrollText(line, 3);

function scrollText(element, speed) {
    const el = element;
    let text = el.innerHTML;
    text = text.trim();
    el.innerHTML = text + ' ' + text;
    let left = 0;
    setInterval(() => {
      left -= speed;
      console.log(el.offsetWidth)
      if (left <= -3350) {
        left = 0;
      }
      el.style.transform = `translateX(${left}px)`;
    }, 1000 / 60);
  }



  const links = document.querySelectorAll('a');


  // circle 
  const circle = document.createElement('div');
  circle.id = 'circle';
  document.body.appendChild(circle);
  
  let mouseX = 0;
  let mouseY = 0;
  let circleX = 0;
  let circleY = 0;
  let prevCircleX = 0;
  let prevCircleY = 0;
  let targetWidth = 45;
  const speed = 0.035;
  const shrinkSpeed = 0.1; // скорость сужения
  let angle = 0; // угол наклона круга
  const angleSpeed = 0.15; // скорость изменения угла наклона
  const stretchFactorMultiplier = 1.7; // множитель для увеличения растяжения
  
  function animate() {
      const dx = circleX - prevCircleX;
      const dy = circleY - prevCircleY;
      const stretchFactorX = Math.max(Math.abs(dx) / 8 * stretchFactorMultiplier, 1);
      targetWidth = 45 * stretchFactorX;
      const currentWidth = parseFloat(circle.style.width || 10);
      const newWidth = currentWidth + (targetWidth - currentWidth) * (dx === 0 && dy === 0 ? shrinkSpeed : speed);
      prevCircleX = circleX;
      prevCircleY = circleY;
      circleX += (mouseX - circleX) * speed;
      circleY += (mouseY - circleY) * speed;
  
      // rotate the circle to face the cursor and center it
      const targetAngle = Math.atan2(mouseY - circleY, mouseX - circleX);
      let angleDiff = targetAngle - angle;
      if (angleDiff > Math.PI) {
          angleDiff -= Math.PI * 2;
      } else if (angleDiff < -Math.PI) {
          angleDiff += Math.PI * 2;
      }
      angle += angleDiff * angleSpeed;
      circle.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
      
      circle.style.top = circleY + 'px';
      circle.style.left = circleX + 'px';
      circle.style.width = `${newWidth}px`;

      // Ограничение движения круга в пределах страницы с учетом прокрутки
      circleX += (mouseX - circleX) * speed;
    circleY += (mouseY - circleY) * speed;

    // Ограничение движения круга в пределах страницы с учетом прокрутки и полосы прокрутки
    const circleRadius = parseFloat(circle.style.width || 10) / 2;
    const minX = window.scrollX + circleRadius;
    const scrollbarWidth = document.documentElement.offsetWidth - document.documentElement.clientWidth;
    const maxX = window.scrollX + window.innerWidth - circleRadius - 18;
    const minY = window.scrollY + circleRadius;
    const maxY = window.scrollY + window.innerHeight - circleRadius;
    if (circleX < minX) {
        circleX = minX;
    } else if (circleX > maxX) {
        circleX = maxX;
    }
    if (circleY < minY) {
        circleY = minY;
    } else if (circleY > maxY) {
        circleY = maxY;
    }


    // Проверка пересечения круга со ссылками
    const circleRect = circle.getBoundingClientRect();
    let isIntersecting = false;
    links.forEach(link => {
        const linkRect = link.getBoundingClientRect();
        if (circleRect.right > linkRect.left && circleRect.left < linkRect.right && circleRect.bottom > linkRect.top && circleRect.top < linkRect.bottom) {
            isIntersecting = true;
        }
    });
    if (isIntersecting) {
        circle.style.backgroundColor = 'transparent';
        circle.style.backdropFilter = 'blur(0px)';
        circle.style.filter = 'invert(1)';
    } else {
        circle.style.backgroundColor = 'rgba(255, 255, 255, 0.281)';
        circle.style.backdropFilter = 'blur(3px)';
        circle.style.filter = 'none';
    }
  
      requestAnimationFrame(animate);
  }
  
  document.addEventListener('mousemove', (event) => {
      mouseX = event.pageX;
      mouseY = event.pageY;
  });
  
  animate();


  // // Изменение стиля круга при наведении курсора на ссылки
  // const links = document.querySelectorAll('a');
  // links.forEach(link => {
  //     link.addEventListener('mouseover', () => {
  //         circle.style.backgroundColor = 'transparent';
  //         // circle.style.mixBlendMode = 'difference';
  //         circle.style.backdropFilter = 'blur(0px)';
  //         circle.style.filter = 'invert(1)';
  //     });
  //     link.addEventListener('mouseout', () => {
  //         circle.style.backgroundColor = 'rgba(255, 255, 255, 0.281)';
  //         // circle.style.mixBlendMode = 'normal';
  //         circle.style.backdropFilter = 'blur(3px)';
  //         circle.style.filter = 'invert(0)';
  //     });
  // });