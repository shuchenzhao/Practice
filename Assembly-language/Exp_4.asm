DATAS SEGMENT
    DATA DW 4,29,11,29,31,7,29,8,8,23
DATAS ENDS
CODE SEGMENT
    ASSUME CS:CODE,DS:DATAS
START: 
    MOV AX,DATAS
    MOV DS,AX            
A0:                      ;��һ��ѭ����������
    MOV CX,8             ;ѭ��9��
    MOV AX,DATA[0]       ;ȡ��һ����
    MOV BX,2             ;�ӵڶ�������ʼ��
A1:                      
    CMP AX,DATA[BX]      ;��ʼ�Ƚ�
    JGE A2               ;���ڵ���������
    XCHG AX,DATA[BX]     ;����ѽϴ������һ��������
    MOV DATA[0],AX       
A2:                      
    ADD BX,2             ;�Ƚ���һ��
    LOOP A1              ;������һ��ѭ��
B0:                      ;�ڶ���ѭ���ҵڶ������
    MOV CX,8             ;ѭ��9��
    MOV AX,-1            ;��AXΪ-1��ʾ����ʧ��
    MOV BX,2             ;�ӵڶ�������ʼ��
    MOV DX,DATA[0]       ;��DX��¼��������
B1:                      
    CMP DX,DATA[BX]      ;�������������������
    JE B2                
    CMP AX,DATA[BX]      ;����ʼ�Ƚ�
    JGE B2               ;���ڵ���������   
    MOV AX,DATA[BX]      ;������AX��¼�½ϴ���
B2:                      
    ADD BX,2             ;�Ƚ���һ��
    LOOP B1              ;������һ��ѭ��
EXIT:                    ;�������ڶ��������AX��
    MOV AH,4CH           
    INT 21H
CODE ENDS
     END START