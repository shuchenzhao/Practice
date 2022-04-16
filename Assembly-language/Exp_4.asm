DATAS SEGMENT
    DATA DW 4,29,11,29,31,7,29,8,8,23
DATAS ENDS
CODE SEGMENT
    ASSUME CS:CODE,DS:DATAS
START: 
    MOV AX,DATAS
    MOV DS,AX            
A0:                      ;第一次循环找最大的数
    MOV CX,8             ;循环9次
    MOV AX,DATA[0]       ;取第一个数
    MOV BX,2             ;从第二个数开始比
A1:                      
    CMP AX,DATA[BX]      ;开始比较
    JGE A2               ;大于等于则跳过
    XCHG AX,DATA[BX]     ;否则把较大数与第一个数交换
    MOV DATA[0],AX       
A2:                      
    ADD BX,2             ;比较下一个
    LOOP A1              ;进行下一次循环
B0:                      ;第二次循环找第二大的数
    MOV CX,8             ;循环9次
    MOV AX,-1            ;若AX为-1表示查找失败
    MOV BX,2             ;从第二个数开始比
    MOV DX,DATA[0]       ;用DX记录下最大的数
B1:                      
    CMP DX,DATA[BX]      ;若与最大的数相等则跳过
    JE B2                
    CMP AX,DATA[BX]      ;否则开始比较
    JGE B2               ;大于等于则跳过   
    MOV AX,DATA[BX]      ;否则用AX记录下较大数
B2:                      
    ADD BX,2             ;比较下一个
    LOOP B1              ;进行下一次循环
EXIT:                    ;结束，第二大的数在AX中
    MOV AH,4CH           
    INT 21H
CODE ENDS
     END START