ok :- 5<6.
nok :- 5>6.
input(A, B) :- write("Input interval [A, B]:\n"), read(A), read(B); nok.
print_num(A) :- write(A), write("\n"), ok.
fib_n(A, B, MIN, MAX) :- 	C is (A+B), A =< MAX, A >= MIN, print_num(A), fib_n(B, C, MIN, MAX);
							C is (A+B), A =< MAX, fib_n(B, C, MIN, MAX);
    						ok.

main :- input(A, B), A =< B, fib_n(0, 1, A, B); 
		ok.
