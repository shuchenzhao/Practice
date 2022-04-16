ASSUME CS:CODE,DS:DATA
DATA SEGMENT
 MSG1 DB 13,10,'Please input the num of Fibonacci��no lager than 256 �� N =  $'
 MSG2 DB 13,10,'Fibonacci Sequence is: $'    ;��ʾ��Ϣ
 
 N DW 0  
 F1  DW 0  
 F2  DW 1  ;�������е���������
DATA ENDS
;
CODE SEGMENT
START:
 MOV AX,DATA
 MOV DS,AX  ;��������
;
 LEA DX,MSG1
 MOV AH,9
 INT 21H    ;��ӡ��ʾ��Ϣ1
 
 CALL INPUT ;����INPUTģ�飬 �õ����� �浽 CX��
 
 CMP CX,1    ;���CX < 1 ���벻�Ϸ�
 JB EXIT     ;ֱ���˳�   
 
 MOV N,CX     ;��N = CX  �� NΪ��������

 LEA DX,MSG2    ;��ӡ�����Ϣ ��Fibonacci Sequence is:��
 MOV AH,9     ;���õ���9�ŷ��� .09H�ŵ��ã��ַ��������ʾ
 INT 21H
 
;�ȴ����һ���� 
 MOV DL,'1'  ; �Ȱ� 1 �ŵ������
 MOV AH,2
 INT 21H
 MOV DL,' '
 INT 21H     ; ��� 1 �� �ո�
 DEC N       ; N --; 
 JZ EXIT     ; �� N = 0ʱ���˳�
 
LOOP:
 MOV AX,F1   ; �� AX = F1
 ADD AX,F2   ; AX =+ F2
 JC EXIT     ; AX������λ �� AX���ܱ�ʾ����
 MOV BX,F2  
 MOV F1,BX   ;���� ֱ��MOV F1,F2 ��֧��������
 MOV F2,AX   ; �� F2 ��ֵ�� F1 , AX �����������һ� ��ֵ�� F2 
 CALL OUTPUT ; �������ģ�� ����������
 MOV DL,' '  
 MOV AH,2
 INT 21H     ;����ո�
 DEC N       ; N--
 JNZ LOOP    ;��ת��ѭ��LOOP JNZ���ɱ�־λZF  ��ZF������������Ըı�ģ�
             ;�������ʹZF�����ı������һ��ָ��    DEC N  �� ��N ��= 0 ��������
EXIT:
 MOV AH,4CH
 INT 21H    ;�˳�����
;
INPUT:
 MOV BL,10 ;  BL Ϊ 10
 MOV CX,0  ;  CX Ϊ 0
 
IN_X:       ;��������  

 MOV AH,7
 INT 21H     ;��ȡ���� 
 
 CMP AL,13 ; ��ȡ���ַ��� �س� 
 JE IN_END ; ��ת���������ģ��  
 
 CMP AL,'0' ; ���벻�Ϸ� �ͼ�������
 JB IN_X
 CMP AL,'9' ; ���벻�Ϸ� �ͼ�������
 JA IN_X  
 
 MOV DL,AL  ;�ѺϷ����� ���뵽DL  
 
 MOV AH,2    ; ����2�Ź��� ����ղ�������ַ�
 INT 21H
 MOV AL,DL   
 SUB AL,30H  ; ��assic��������
 MOV AH,0    ; AH Ϊ 0                       
 XCHG AX,CX  ; ��cx��ɸ����������
 MUL BL      ; AX = AL * BL(10) Ҳ���ǳ�����Ӧ��Ȩ ��λ����100  ʮλ����10 
 ADD CX,AX   ; CX += AX;   cx��ʾ�ľ������������쳲���������
 ;�����������������ֵ�� �������Ϊ256 ����������256 ��ֱ�ӽ���
 CMP CH,0    ;�ж�CX��ǰ8λ�ǲ���Ϊ0�� �����Ϊ0�� ˵������256 
 JNZ IN_END  ;����256 ֱ�ӽ�������
 JMP IN_X    ;�����������

IN_END:
 RET   ;��������
;
OUTPUT:
 MOV BX,10  ;BX ��ʼ��Ϊ 10
 MOV CX,0   ;CX ��ʼΪ 0
;�������������Ĵ��� 
; ����Ĵ������ڰ�����ת�����ַ���
;������ÿ�ΰ�����10 �õ����� ѹ��ջ���ڣ�ֱ��������Ϊ0�� Ȼ���������ջ���ַ�       

LOOP1:MOV DX,0  ;  DX = 0
 DIV BX       ; AXΪ������ AX =  AX / 10;  ��������DX�� ����������λ������
 ADD DL,'0'   ; ��DL ���� '0'  ��ʱ DL����ֱ��������ַ�����
 PUSH DX      ; ��DX ѹ��ջ
 INC CX       ; CX ++
 CMP AX,0     
 JNZ LOOP1      ; ���AX ��Ϊ 0, �ͼ���LOOP1
 MOV AH,2
LOOP2:POP DX    ;ѭ�����ջ���ַ�
 INT 21H
 LOOP LOOP2
 RET          ;��������
;
CODE ENDS
 END START

