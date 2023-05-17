<template>
  <div class="s-input">
    <div class="input-area">
      <input
        ref="inputRef"
        v-model="textValue"
        :type="inputType"
        :disabled="disabled"
        :class="{ invalid: isErrorMsg }"
        @input="onInput"
        @focusin="onFocusin"
        @focusout="onFocusout"
      />
      <div v-show="showClearableIcon" class="clear-icon">
        <font-awesome-icon icon="circle-xmark" @click="onClearText" />
      </div>
      <template v-if="showIcon">
        <font-awesome-icon class="password-icon" :icon="['fas', iconMode ? 'eye' : 'eye-slash']" />
      </template>
    </div>

    <div class="info-area">
      <div v-show="isErrorMsg" class="error-msg">{{ errorMsg }}</div>
      <div v-show="showCharacterLength" class="char-length">{{ characterLength }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, ref, watch } from 'vue';

export default {
  props: {
    /**
     * 비밀번호 타입 사용 여부
     */
    password: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * 비밀번호 보기/숨김 기능 사용 여부
     */
    showIcon: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * 비활성 여부
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * 값 clear
     */
    clearable: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * 유효성 체크
     *
     * required : 값 필수 여부
     *
     * min : 최소 길이
     */
    rules: {
      type: Object,
      required: false,
      default: undefined
    }
  },
  emits: [
    /** input 이벤트 */
    'input',
    /** focusin 이벤트 */
    'focusin',
    /** focusout 이벤트 */
    'focusout'
  ],
  setup(props, { emit }) {
    const iconMode = ref<boolean>(false);
    const textType = ref(props.password);
    const textValue = ref<string>('');
    const showCharacterLength = ref<boolean>(false);
    const inputRef = ref<HTMLInputElement | null>(null);
    const isErrorMsg = ref<boolean>(false);
    const errorMsg = ref<string>('');
    const showClearableIcon = ref<boolean>(false);

    const inputType = computed<'password' | 'text'>(() => {
      return textType.value ? 'password' : 'text';
    });

    const characterLength = computed<number>(() => {
      return textValue.value.length;
    });

    const showText = (): void => {
      iconMode.value = !iconMode.value;
      textType.value = !textType.value;
    };

    const onFocusin = (e: FocusEvent): void => {
      showCharacterLength.value = true;
      if (props.clearable) {
        showClearableIcon.value = true;
      }
      validate();
      emit('focusin', e);
    };

    const onFocusout = (e: FocusEvent): void => {
      showCharacterLength.value = false;
      emit('focusout', e);
    };

    const onInput = (e: InputEvent): void => {
      emit('input', e);
    };

    const isRuleNames = (value: unknown): boolean => {
      return ['required', 'min'].includes(value as string);
    };

    const validate = (): boolean => {
      let result: boolean = true;

      if (!props.rules) {
        return result;
      }

      for (let rule in props.rules) {
        if (!isRuleNames(rule)) {
          continue;
        }

        const msg = props.rules[rule](textValue.value);
        // 유효하지 않은 경우
        if (typeof msg === 'string') {
          result = false;
          isErrorMsg.value = true;
          errorMsg.value = msg;
          inputFocus();
          break;
        }
      }

      return result;
    };

    const inputFocus = (): void => {
      if (inputRef.value) {
        inputRef.value.focus();
      }
    };

    const onClearText = () => {
      textValue.value = '';
      showClearableIcon.value = false;
    };

    watch(textValue, () => {
      const isValidate = validate();
      if (isValidate) {
        isErrorMsg.value = false;
      }
    });

    watch(
      () => props.password,
      () => {
        textType.value = props.password;
      }
    );

    return {
      inputType,
      textValue,
      onFocusin,
      onFocusout,
      onInput,
      onClearText,
      isErrorMsg,
      validate,
      iconMode,
      showText,
      errorMsg,
      showCharacterLength,
      showClearableIcon,
      characterLength
    };
  }
};
</script>
<style lang="scss" scoped>
.s-input {
  display: inline-block;
  .input-area {
    &::after {
      content: '';
      display: block;
      clear: both;
    }
    input {
      float: left;
      width: 200px;
      height: 21px;
      line-height: 19px;
      vertical-align: middle;
      outline: none;
    }
    .clear-icon {
      float: left;
      margin-left: 5px;
    }
    .password-icon {
      float: left;
      margin-left: 5px;
    }
  }
  .info-area {
    &::after {
      content: '';
      display: block;
      clear: both;
    }
    .error-msg {
      float: left;
      color: red;
    }
    .char-length {
      float: right;
    }
  }
}
</style>
