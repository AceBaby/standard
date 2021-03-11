<template>
  <div class="dialogContainer">
    <modal
        :name="dialogName"
        transition="pop-out"
        :clickToClose="false"
        :width="width"
        :height="height"
        :shiftX="shiftData"
        :shiftY="shiftData"
        :adaptive="true"
    >
      <div class="dialogHeader backgroundColor">
        <div class="dialogHeaderBorder">
          <span class="dialogHeaderTitle">
               {{title}}
          </span>
        </div>
      </div>
      <div class="commonMiddleContent backgroundColor">
        <slot name="middleContent"></slot>
      </div>
      <div class="dialogFooter backgroundColor">
        <slot name="buttonSlot">
          <div class="dialogFooterDiv">
            <button  class="btn btnSize red_btn" style="margin-right: 30px;" @click="cancel">取消</button>
            <button  class="btn btnSize purple_btn" @click="confirm">确定</button>
          </div>
        </slot>
      </div>
    </modal>
  </div>

</template>

<script>
export default {
    name: 'BasicDialog',
    props: ['title', 'width', 'height', 'dialogName'],
    data() {
        return {
            shiftData: 0.5
        };
    },
    methods: {
        cancel() {
            this.$modal.hide(this.dialogName);
            this.$emit('dialogCancel');
        },
        confirm() {
            this.$emit('dialogConfirm');
        }
    }
};
</script>

<style lang="less" scoped>
    .dialogContainer {
        display: flex;
    }

    /deep/ .vm--modal {
        padding: 17px 15px 10px 10px;
        background-size: 100% 100%;
        .backgroundImage('/background/blue');
    }

    .backgroundColor {
        border-radius: 5px;
        background-color: rgba(0, 0, 0, .6);
    }

    .dialogHeaderBorder {
        width: 100%;
        border-bottom: 1px solid rgba(51, 51, 51, .1);
        line-height: 59px;
    }

    .dialogContainer /deep/ {
        .v--modal-overlay .v--modal-box {
            display: flex;
            flex-direction: column;
        }
    }

    .dialogHeader {
        display: flex;
        justify-content: space-between;
        height: 60px;
        padding: 0 20px;
    }

    .dialogHeaderTitle {
        font-size: 18px;
        line-height: 18px;
        letter-spacing: 0;
        color: #fff;
    }

    .commonMiddleContent {
        display: flex;
        flex: 1;
        height: calc(100% - 140px);
        padding: 0 20px;
        overflow-y: auto;
    }

    .dialogFooter {
        height: 80px;
        padding: 0 20px;
    }

    .dialogFooterDiv {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 80px;
        padding-top: 30px;
        border-top: 1px solid rgba(51, 51, 51, .1);
    }
</style>
