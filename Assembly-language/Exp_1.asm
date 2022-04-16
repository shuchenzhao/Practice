STACK SEGMENT STACK'STACK'
     DW 1FFH DUP(?)
TOP LABEL WORD
STACK ENDS  
;��ջ��

DATA SEGMENT        
VAR DW 200 DUP (?) 
perA DW 0
perB DW 0
perC DW 0
perD DW 0                         
DATA ENDS 
;���ݶ�

CODE SEGMENT
     ASSUME CS:CODE,DS:DATA,ES:DATA,SS:STACK   
          
START1:
    
     MOV  perA,00H
     MOV  perB,00H
     MOV  perC,00H
     MOV  perD,00H
     XOR BX,BX     ;��BX����          
     MOV CX,30    ;���ѭ������, ����SCOREֵ�ĸ���,�ɸ�����Ҫ����
     LEA SI,VAR
L1:
     PUSH CX     
     CALL RAND     ;���������������������������BX��
     MOV [SI] ,BX   ;���ɵ������,��ŵ�SIָ��ļĴ�����Ԫ��
  S1:  
     
     CMP BL,90   ;>=90��
     JC S2  ;<90��ת��,���ź�75���бȽ�
     INC  perA;>=90��,A�ȼ�������1 
     JMP NEXT
  S2:
     CMP BL,75  ;>=75��
     JC  S3   ;<75��ת��,���ź�60���бȽ�
     INC  perB   ;>=75��,B�ȼ�������1
     JMP NEXT
  S3:
     CMP BL,60   ;>=60��
     JC S4     ;<60��ת��,���ȼ�����ΪD
     INC  perC       ;>=60��,C�ȼ�������1  
     JMP NEXT
  S4:
     INC  perD       ;<60��,D�ȼ�������1
     JMP NEXT   
     
NEXT:
     POP CX
     ADD SI,2        ;��ѭ������������ջ��CX
     MOV AX,BX       ;���������ֵ��AX��������ʾ����
     CALL DISP 
     LOOP L1
     ;��ʾ���� 
     XOR BX,BX 
     XOR DX,DX
     
     MOV AX,perA  ;��PERA��*100��/CX�Ϳɵõ��ٷֱ�
     MOV BL,100
     MUL BL         ;MUL�Ľ������AX��
     MOV DL,30
     DIV DL         ;DIV���̴���AL�У���������AH��
     XOR AH,AH      ;���������㣬������                                        
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
     ;����0~100�����
     RAND PROC
      PUSH CX
      PUSH DX
      PUSH AX
      XOR BX,BX
      STI
      MOV AH,0             ;��ʱ�Ӽ�����ֵ
      INT 1AH
      MOV AX,DX            ;���6λ
      AND AH,3
      MOV DL,101           ;��101������0~100����
      DIV DL
      MOV BL,AH            ;������BX���������
      POP AX
      POP DX
      POP CX
      RET
    RAND ENDP
        ;��ʾ����
        DISP PROC
        PUSH CX
        PUSH DX
        ;PUSH AX
        ;MOV AX ,PERD                    ;��Ҫ���������
        OR  AX , AX
        JZ  ZERO
        MOV BX , -1                     ;����ջ�ױ�־
        PUSH BX
        MOV BX , 10                     ;����

REPEAT: XOR DX , DX
        DIV BX
        MOV CX , AX                     ;��
        OR  CX , DX
        JZ  PRINT_EXIT                  ;��������ȫ�������
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
	 ;�س�����
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
;�����

END  
     
     
