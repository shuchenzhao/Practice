        CODE  SEGMENT
              ASSUME    CS:CODE
              ORG       100H 
              
      START:  PUSH      CS
              POP       DS
              PUSH      CS
              POP       ES
              MOV       AX,5        ;������
              MOV       BX,17       ;����
              CALL      MUL8        ;8λ�˷���0-255
             ;CALL      MUL16       ;16λ�˷���0-65535         
 
              MOV       AH,4CH
              INT       21H       
                     
; ������������al �У� ���������� bl��, ���������ax��
       MUL8   PROC      NEAR
              PUSH      DX          ;��Ų��ֻ�
              PUSHF
              MOV       AH,0
              MOV       DX,0
              CMP       BL,0        ;������ȫ���Ƴ�
              JE        @MULEXIT    ;�˷����
      @MUL1:  SHR       BL,1        ;�����߼�����һλ
              JNC       @MUL2       ;���޽�����λ
              ADD       DL,AL       ;DL+=AL
              ADC       DH,AH       ;add with carry
      @MUL2:  SHL       AL,1        ;�˻��߼�����һλ
              RCL       AH,1        ;����λ����
              CMP       BL,0
              JNE       @MUL1
              MOV       AH,DH
              MOV       AL,DL
              POPF
              POP       DX
              RET       
    @MULEXIT: MOV       AX,0
              POPF
              POP       DX
              RET
        MUL8  ENDP

; ������������ax �У� ���������� bx��, ���������dx/ax��
       MUL16  PROC      NEAR
              PUSH      SI          ; ��ŵ�16λ
              PUSH      DI          ; ��Ÿ�16λ
              PUSHF
              MOV       DX,0
              MOV       SI,0
              MOV       DI,0
              CMP       BX,0
              JE        @@MULEXIT    
      @@MUL1: SHR       BX,1
              JNC       @@MUL2
              ADD       SI,AX
              ADC       DI,DX   
      @@MUL2: SHL       AX,1
              RCL       DX,1
              CMP       BX,0
              JNE       @@MUL1
              MOV       DX,DI
              MOV       AX,SI
              POPF
              POP       DI
              POP       SI
              RET     
   @@MULEXIT: MOV       AX,0
              POPF
              POP       DI
              POP       SI
              RET
       MUL16  ENDP 
                       
 ;==================================================                     
    CODE      ENDS
    END       START
                