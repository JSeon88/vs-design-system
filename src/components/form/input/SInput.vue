<template>
  <div>
    <input
      :type="inputType"
      v-model="textValue"
      @focusin="onFocusin"
      @focusout="onFocusout"
      :class="{ invalid: isErrorMsg }"
      ref="inputRef"
    />
    <template v-if="showIcon">
      <font-awesome-icon :icon="['fas', iconMode ? 'eye' : 'eye-slash']" />
    </template>
    <div v-show="isErrorMsg" class="error-msg">{{ errorMsg }}</div>
    <div v-show="showCharacterLength">length : {{ characterLength }}</div>
  </div>
</template>
<script lang="ts">
import { computed, ref, watch } from 'vue';

type ruleNames = 'required' | 'min';

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
    /** focusin 이벤트 */
    'focusin'
  ],
  setup(props, { emit }) {
    const iconMode = ref<boolean>(false);
    const textType = ref(props.password);
    const textValue = ref<string>('');
    const showCharacterLength = ref<boolean>(false);
    const inputRef = ref<HTMLInputElement | null>(null);
    const isErrorMsg = ref<boolean>(false);
    const errorMsg = ref<string>('');

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
      validate();
      emit('focusin', e);
    };

    const onFocusout = (): void => {
      showCharacterLength.value = false;
    };

    const isRuleNames = (value: unknown): value is ruleNames => {
      return ['required', 'min'].includes(value as string);
    };

    const validate = (): boolean => {
      let result: boolean = true;
      if (props.rules) {
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
      }

      return result;
    };

    const inputFocus = (): void => {
      if (inputRef.value) {
        inputRef.value.focus();
      }
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
      isErrorMsg,
      validate,
      iconMode,
      showText,
      errorMsg,
      showCharacterLength,
      characterLength
    };
  }
};
</script>
<style scoped>
input {
  vertical-align: middle;
  margin-right: 5px;
}

img {
  vertical-align: middle;
  margin-right: 5px;
}

.error-msg {
  color: red;
}

input {
  outline: none;
}
.invalid {
  border-color: red;
}
</style>
