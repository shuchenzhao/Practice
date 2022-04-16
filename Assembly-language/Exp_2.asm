        CODE  SEGMENT
              ASSUME    CS:CODE
              ORG       100H 
              
      START:  PUSH      CS
              POP       DS
              PUSH      CS
              POP       ES
              MOV       AX,5        ;被乘数
              MOV       BX,17       ;乘数
              CALL      MUL8        ;8位乘法，0-255
             ;CALL      MUL16       ;16位乘法，0-65535         
 
              MOV       AH,4CH
              INT       21H       
                     
; 被乘数放置于al 中， 乘数放置于 bl中, 结果放置于ax中
       MUL8   PROC      NEAR
              PUSH      DX          ;存放部分积
              PUSHF
              MOV       AH,0
              MOV       DX,0
              CMP       BL,0        ;乘数已全部移出
              JE        @MULEXIT    ;乘法完成
      @MUL1:  SHR       BL,1        ;乘数逻辑右移一位
              JNC       @MUL2       ;若无进、借位
              ADD       DL,AL       ;DL+=AL
              ADC       DH,AH       ;add with carry
      @MUL2:  SHL       AL,1        ;乘积逻辑左移一位
              RCL       AH,1        ;带进位左移
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

; 被乘数放置于ax 中， 乘数放置于 bx中, 结果放置于dx/ax中
       MUL16  PROC      NEAR
              PUSH      SI          ; 存放低16位
              PUSH      DI          ; 存放高16位
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
                