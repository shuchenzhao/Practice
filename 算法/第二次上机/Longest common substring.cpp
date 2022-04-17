#include<iostream>
#include<string.h>
using namespace std;

//dp[i][j]:串(x1,x2,...,xi)与串(y1,y2,...,yj)，
//d[i][j]表示这两个串结与最长公共子串结尾相同时，最长公共子串的长度

//状态转移方程如下： 
//若i=0或j=0，则dp[i][j] = 0
//否则：
//		若A[i]==B[j]，则dp[i][j] = dp[i-1][j-1] + 1
//		若A[i]!=B[j]，则dp[i][j] = 0


//用于打印的函数，后面才用到 
void print_substring(string str, int end, int length)
{
	int start = end - length + 1;
	for (int k = start; k <= end; k++)
		cout << str[k];
	cout << endl;
}

int main()
{
	string A, B;
	cin >> A >> B;
	int x = A.length();
	int y = B.length();
	A = " " + A;//特殊处理一下，便于编程 
	B = " " + B;

	int** dp = new int* [x + 1];
	int i, j;
	for (i = 0; i <= x; i++)
	{
		dp[i] = new int[y + 1];
		for (j = 0; j <= y; j++)
			dp[i][j] = 0;
	}


	//下面计算dp[i][j]的值并记录最大值 
	int max_length = 0;
	for (i = 1; i <= x; i++)
		for (j = 1; j <= y; j++)
			if (A[i] == B[j])
			{
				dp[i][j] = dp[i - 1][j - 1] + 1;
				if (dp[i][j] > max_length)
					max_length = dp[i][j];
			}
			else
				dp[i][j] = 0;


	//LCS的长度已经知道了，下面是根据这个最大长度和dp[][]的值，
	//找到对应的 LCS具体子串， 注意：可能有多个 
	int const arr_length = (x > y ? x : y) + 1;
	int end_A[arr_length];	//记录LCS在字符串A中结束的位置 
	int num_max_length = 0;	//记录LCS的个数 

	for (i = 1; i <= x; i++)
		for (j = 1; j <= y; j++)
			if (dp[i][j] == max_length)
				end_A[num_max_length++] = i;

	cout << "the length of LCS(substring) is : " << max_length << endl << " nums: " << num_max_length << endl << "they are (it is): " << endl;
	for (int k = 0; k < num_max_length; k++)	//输出每个具体的子串 
		print_substring(A, end_A[k], max_length);

	return 0;
}