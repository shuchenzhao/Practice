data segment
number dw 153,21,48,11,656,1,94,13,34,2222
x db 4 dup                     ;用于存放商
data ends

code segment
    assume cs:code,ds:data
start:
    mov ax,data
    mov ds,ax  
    mov bx,offset number       ;number的段内偏移地址
    
    mov cx,10                  ;cx 记录需要循环的次数
    mov si,0
    
    call sort
    
    
    display:                   ;外循环，用于逐个输出数字
    call dis                   ;调用dis 打印输出
    add si,2                   ;si++
    
    mov dl,20h                 ;在每个数字后输出空格
    mov ah,2
    int 21h
    
    loop display
    
    
    mov ah,4ch
    int 21h          

    
    
    
    ;子程序sort：用于实现冒泡排序
    sort proc
    
    push ax
    push bx
    push cx
    push si
    
    dec cx                     ;cx--
    
    ;冒泡排序外循环
    outsl:
    
    push cx                    ;保护cx
    mov si,0                   ;si 置0
    
    ;冒泡排序内循环
    insl:
    mov ax,[bx][si]            ;寻址         
    cmp ax,[bx][si+2]          ;下一个数字比较
    jc nextl                   ;大于、等于则跳出
    xchg ax,[bx][si+2]         ;小于则交换
    mov [bx][si],ax     
    nextl:
    add si,2                   ;si++
    loop insl
    
    pop cx
    loop outsl
     
     
    pop si
    pop cx
    pop bx
    pop ax    
    
    ret
    sort endp





    ;子程序dis：用于各个数字的打印输出
    dis proc
    
    push ax
    push bx
    push si
    push cx    
    
    mov ax,[bx][si]            ;寻址 基址加变址
    mov cl,10
    mov si,0                   ;存放角标
    
    div10:                     ;通过循环除以10的余数逐位记录数字
    div cl                     ;ax / cl 余数在ah 商在al 
    mov x[si],ah               ;存放余数
    inc si                      ;si++
    mov ah,0                    ;余数清零
    cmp ax,0                   ;比较商是否为0
    jne div10                  ;循环除以10至商为0
    mov cx,si               
    
    disl:                      ;循环逐个打印数字
    dec si                     ;遍历x[0]到 x[si-1]
    mov dl,x[si]            
    add dl,30h                 ;ASCLL码从48开始，加48以输出整数
    mov ah,2
    int 21h
    loop disl                  ;循环除以10
    
    pop cx
    pop si
    pop bx
    pop ax
    
    ret
    dis endp

CODE ENDS
     END START