STACK SEGMENT STACK'STACK'
     DW 1FFH DUP(?)
TOP LABEL WORD
STACK ENDS  
;堆栈段

DATA SEGMENT        
VAR DW 200 DUP (?) 
perA DW 0
perB DW 0
perC DW 0
perD DW 0                         
DATA ENDS 
;数据段

CODE SEGMENT
     ASSUME CS:CODE,DS:DATA,ES:DATA,SS:STACK   
          
START1:
    
     MOV  perA,00H
     MOV  perB,00H
     MOV  perC,00H
     MOV  perD,00H
     XOR BX,BX     ;对BX清零          
     MOV CX,30    ;外层循环次数, 产生SCORE值的个数,可根据需要更改
     LEA SI,VAR
L1:
     PUSH CX     
     CALL RAND     ;调用随机数函数，将随机数存放在BX中
     MOV [SI] ,BX   ;生成的随机数,存放到SI指向的寄存器单元中
  S1:  
     
     CMP BL,90   ;>=90分
     JC S2  ;<90分转移,接着和75进行比较
     INC  perA;>=90分,A等级总数加1 
     JMP NEXT
  S2:
     CMP BL,75  ;>=75分
     JC  S3   ;<75分转移,接着和60进行比较
     INC  perB   ;>=75分,B等级总数加1
     JMP NEXT
  S3:
     CMP BL,60   ;>=60分
     JC S4     ;<60分转移,将等级划分为D
     INC  perC       ;>=60分,C等级总数加1  
     JMP NEXT
  S4:
     INC  perD       ;<60分,D等级总数加1
     JMP NEXT   
     
NEXT:
     POP CX
     ADD SI,2        ;将循环次数弹出堆栈到CX
     MOV AX,BX       ;将随机数赋值给AX，调用显示函数
     CALL DISP 
     LOOP L1
     ;显示数据 
     XOR BX,BX 
     XOR DX,DX
     
     MOV AX,perA  ;将PERA先*100再/CX就可得到百分比
     MOV BL,100
     MUL BL         ;MUL的结果存入AX中
     MOV DL,30
     DIV DL         ;DIV的商存入AL中，余数存入AH中
     XOR AH,AH      ;将余数清零，保留商                                        
     CALL DISP 
     

     XOR BX,BX 
     XOR DX,DX

     MOV AX,perB

     MOV BL,100 
     MUL BL
     MOV DL,30
     DIV DL
     XOR AH,AH 

     CALL DISP 

     XOR BX,BX 
     XOR DX,DX

     MOV AX,perC

     MOV BL,100 
     MUL BL
     MOV DL,30
     DIV DL
     XOR AH,AH 
  
     CALL DISP 

     XOR BX,BX 
     XOR DX,DX

     MOV AX,perD
 
     MOV BL,100 
     MUL BL
     MOV DL,30
     DIV DL
     XOR AH,AH 
  
     CALL DISP

     
     MOV AH,4CH
     INT 21H
     ;产生0~100随机数
     RAND PROC
      PUSH CX
      PUSH DX
      PUSH AX
      XOR BX,BX
      STI
      MOV AH,0             ;读时钟计数器值
      INT 1AH
      MOV AX,DX            ;清高6位
      AND AH,3
      MOV DL,101           ;除101，产生0~100余数
      DIV DL
      MOV BL,AH            ;余数存BX，作随机数
      POP AX
      POP DX
      POP CX
      RET
    RAND ENDP
        ;显示函数
        DISP PROC
        PUSH CX
        PUSH DX
        ;PUSH AX
        ;MOV AX ,PERD                    ;将要输出的数字
        OR  AX , AX
        JZ  ZERO
        MOV BX , -1                     ;余数栈底标志
        PUSH BX
        MOV BX , 10                     ;除数

REPEAT: XOR DX , DX
        DIV BX
        MOV CX , AX                     ;商
        OR  CX , DX
        JZ  PRINT_EXIT                  ;商与余数全零则结束
        PUSH DX
        JMP REPEAT

ZERO:   MOV DL , 30H
        MOV AH , 02H
        INT 21H

PRINT_EXIT:
        POP DX
        CMP DX ,-1
        JE  EXIT
        ADD DX , 30H
        MOV AH , 02H
        INT 21H
        JMP PRINT_EXIT
EXIT:
	 ;回车换行
    MOV AH,02H
	MOV DL,0DH
	INT 21H
	MOV AH,02H
	MOV DL,0AH
	INT 21H
	POP DX
	POP CX     
    RET
    DISP ENDP 
	
CODE ENDS 
;代码段

END  
     
     
