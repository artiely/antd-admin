<template>
  <div class="product-wrapper">
    <div class="products-title">
      <a-button type="primary">
        <router-link to="/">回首页</router-link>
      </a-button>
      <h1>Responsive Product Cards</h1>
    </div>
    <div class="carousel ">
      <a-row :gutter="8">
        <a-col :pull="3" :push="3" :lg="6" :md="18" :sm="18" :xs="18" v-for="i in 3">
          <figure class="product-card draw">
            <div class="fig-head">
              <h2>Intro Product</h2>
            </div>
            <ul class="product-checklist">
              <li>Product Feature 1</li>
              <li class="check">Product Feature 2</li>
              <li class="check">Product Feature 3</li>
              <li class="check">Product Feature 4</li>
              <li class="check">Product Feature 5</li>
              <li>Product Feature 6</li>
            </ul>
            <div class="button-text">
              <a class="learn" href>
                <span>Buy Now</span>
              </a>
            </div>
          </figure>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.render()
    })
  },
  methods: {
    render() {
      function perspectiveHover(el, intensity) {
        var mousePosition = function(e, el) {
          var el = el

          var elX = el.offsetLeft,
            elY = el.offsetTop,
            elWidth = el.offsetWidth,
            elHeight = el.offsetHeight

          var mouseX = e.pageX,
            mouseY = e.pageY

          if (mouseX >= elX && mouseX <= elX + elWidth) {
            if (mouseY >= elY && mouseY <= elY + elHeight) {
              var rotateY = -(
                  ((elWidth / 2 - (mouseX - elX)) / (elWidth / 2)) *
                  intensity
                ),
                rotateX =
                  ((elHeight / 2 - (mouseY - elY)) / (elHeight / 2)) * intensity

              el.style.transform =
                'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)'

              return true
            }
          }
        }

        var reset = function() {
          el.style.transform = 'rotateX(0deg) rotateY(0deg)'
        }

        var perspective = function() {}

        document.querySelector(el).addEventListener('mousemove', function(e) {
          mousePosition(e, this)
        })
      }

      perspectiveHover('.carousel', 6)
    },
  },
}
</script>

<style lang="less">
.product-wrapper {
  padding: 10px;
  text-align: center;
  perspective: 1000px;
}
.product-card {
  display: flex;
  flex-direction: column;
  height: 500px;
  background: #f8f8f8;
  &:hover{
    box-shadow: 0px 3px 20px rgba(0,0,0,0.15)

  }
  .fig-head {
    height: 75px;
    line-height: 75px;
    background: #eee;
  }
  .product-checklist {
    flex: 1;
    line-height: 2;
    font-size: 20px;
  }
  .button-text {
    height: 60px;
    line-height: 60px;
    background: #ff6666;
    cursor: pointer;
  }
}
// 绘制边框
.product-card::before, .product-card::after {
  box-sizing: inherit;
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
}

.draw {
  transition: color 0.25s;
}
.draw::before, .draw::after {
  border: 2px solid transparent;
  width: 0;
  height: 0;
}
.draw::before {
  top: 0;
  left: 0;
}
.draw::after {
  bottom: 0;
  right: 0;
}
.draw:hover {
  color: #60daaa;
}
.draw:hover::before, .draw:hover::after {
  width: 100%;
  height: 100%;
}
.draw:hover::before {
  border-top-color: #60daaa;
  border-right-color: #60daaa;
  transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
}
.draw:hover::after {
  border-bottom-color: #60daaa;
  border-left-color: #60daaa;
  transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s, height 0.25s ease-out 0.75s;
}
</style>
